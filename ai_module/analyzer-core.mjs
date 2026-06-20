const DEFAULT_RULES = {
  maxPeoplePerRoom: 8,
  heartRate: {
    lowWatch: 50,
    highWatch: 110,
    highCritical: 130,
  },
  respiratoryRate: {
    lowWatch: 10,
    highWatch: 28,
    pauseCritical: 6,
  },
  bodyTemperature: {
    lowWatch: 36.1,
    highWatch: 37.8,
    highCritical: 38.5,
  },
  crowd: {
    nearCapacity: 7,
    overCapacity: 8,
  },
};

const SEVERITY_RANK = {
  normal: 0,
  watch: 1,
  critical: 2,
};

function num(value) {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function vital(frame, names) {
  const vs = frame?.vital_signs ?? frame?.vitals ?? frame ?? {};
  for (const name of names) {
    const value = num(vs[name]);
    if (value !== null) return value;
  }
  return null;
}

function personCount(frame) {
  const explicit = num(frame?.estimated_persons ?? frame?.n_persons ?? frame?.person_count);
  if (explicit !== null) return explicit;
  if (Array.isArray(frame?.persons)) return frame.persons.length;
  return 0;
}

function addIssue(issues, severity, title, recommendations) {
  issues.push({ severity, title, recommendations });
}

function worstSeverity(issues) {
  return issues.reduce((worst, issue) => (
    SEVERITY_RANK[issue.severity] > SEVERITY_RANK[worst] ? issue.severity : worst
  ), 'normal');
}

export function normalizeFrame(input) {
  const frame = { ...input };
  if (!frame.vital_signs) {
    frame.vital_signs = {
      heart_rate_bpm: input.heart_rate_bpm ?? input.hr_bpm ?? input.heartrate_bpm,
      breathing_rate_bpm: input.respiratory_rate_bpm ?? input.breathing_rate_bpm ?? input.respiration_bpm,
      body_temperature_c: input.body_temperature_c ?? input.body_temp_c ?? input.temperature_c,
    };
  }
  if (!frame.classification) {
    frame.classification = {
      presence: String(input.presence ?? '').toLowerCase() === 'true' || personCount(input) > 0,
      fall_detected: String(input.fall_detected ?? '').toLowerCase() === 'true' || input.scenario === 'fall_event',
      motion_level: input.motion_level,
      confidence: num(input.confidence) ?? 0,
    };
  }
  return frame;
}

export function analyzeFrame(input, rules = DEFAULT_RULES) {
  const frame = normalizeFrame(input);
  const classification = frame.classification ?? {};
  const hr = vital(frame, ['heart_rate_bpm', 'heartrate_bpm', 'hr_proxy_bpm']);
  const rr = vital(frame, ['respiratory_rate_bpm', 'breathing_rate_bpm', 'breathing_bpm']);
  const temp = vital(frame, ['body_temperature_c', 'body_temp_c', 'temperature_c']);
  const count = personCount(frame);
  const issues = [];

  if (classification.fall_detected || frame.scenario === 'fall_event') {
    addIssue(issues, 'critical', 'Fall pattern detected', [
      'Check the resident immediately.',
      'Confirm whether post-fall movement is low or absent.',
      'Escalate to the configured caregiver workflow if the resident does not respond.',
    ]);
  }

  if (rr !== null && rr <= rules.respiratoryRate.pauseCritical) {
    addIssue(issues, 'critical', 'Possible respiratory pause', [
      'Check the person immediately and verify sensor placement.',
      'Escalate if the pause repeats or appears with low movement.',
    ]);
  } else if (rr !== null && (rr < rules.respiratoryRate.lowWatch || rr > rules.respiratoryRate.highWatch)) {
    addIssue(issues, 'watch', 'Respiratory rate outside expected range', [
      'Keep monitoring respiratory trend for multiple windows.',
      'Check recent exercise, sleep state, and signal confidence before escalation.',
    ]);
  }

  if (hr !== null && hr >= rules.heartRate.highCritical) {
    addIssue(issues, 'critical', 'Heart rate is critically high', [
      'Check the person and confirm the reading with a secondary device.',
      'Reduce activity load if this is a fitness scenario.',
    ]);
  } else if (hr !== null && (hr < rules.heartRate.lowWatch || hr > rules.heartRate.highWatch)) {
    addIssue(issues, 'watch', 'Heart rate outside expected range', [
      'Compare with activity context and repeat the reading.',
      'Escalate if abnormal heart rate persists with distress or fall indicators.',
    ]);
  }

  if (temp !== null && temp >= rules.bodyTemperature.highCritical) {
    addIssue(issues, 'critical', 'Body temperature is critically high', [
      'Verify the value with a contact thermometer.',
      'Check hydration, ventilation, and recent activity context.',
      'Escalate if the high temperature persists or appears with distress signals.',
    ]);
  } else if (temp !== null && (temp < rules.bodyTemperature.lowWatch || temp > rules.bodyTemperature.highWatch)) {
    addIssue(issues, 'watch', 'Body temperature outside expected range', [
      'Verify the reading with the external temperature sensor.',
      'Check room conditions, sensor contact, and recent activity.',
    ]);
  }

  if (count > rules.maxPeoplePerRoom) {
    addIssue(issues, 'critical', 'Room occupancy exceeds RuVigil limit', [
      `Reduce room occupancy to ${rules.maxPeoplePerRoom} people or fewer.`,
      'Move extra people to another monitored room.',
    ]);
  } else if (count >= rules.crowd.nearCapacity) {
    addIssue(issues, 'watch', 'Room is near occupancy capacity', [
      'Keep the room below the 8-person limit.',
      'Watch for further entries before allowing more people in.',
    ]);
  }

  const severity = worstSeverity(issues);
  return {
    severity,
    summary: issues.length === 0
      ? 'No active RuVigil risks detected in this frame.'
      : issues.map((issue) => issue.title).join('; '),
    recommendations: issues.flatMap((issue) => issue.recommendations),
    metrics: {
      estimated_persons: count,
      heart_rate_bpm: hr,
      respiratory_rate_bpm: rr,
      body_temperature_c: temp,
      confidence: num(classification.confidence),
    },
  };
}

export { DEFAULT_RULES };
