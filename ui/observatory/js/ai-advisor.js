/**
 * RuVigil AI advisor.
 *
 * Consumes the current visualization frame and emits a compact risk summary
 * plus operator actions. This is deterministic edge logic; a later LLM layer
 * can use the same output contract for natural-language explanations.
 */

const NORMAL_TEMP_MIN_C = 36.1;
const NORMAL_TEMP_MAX_C = 37.8;
const FEVER_TEMP_C = 38.0;
const HIGH_FEVER_TEMP_C = 39.0;
const HYPOTHERMIA_TEMP_C = 35.5;

function tempFrom(vs) {
  const value = vs?.body_temperature_c ?? vs?.body_temp_c ?? vs?.temperature_c;
  return Number.isFinite(value) ? value : 0;
}

function pushIssue(issues, severity, summary, recommendations) {
  issues.push({ severity, summary, recommendations });
}

function severityRank(severity) {
  return severity === 'critical' ? 3 : severity === 'watch' ? 2 : 1;
}

export function analyzeFrame(data) {
  const vs = data?.vital_signs || {};
  const cls = data?.classification || {};
  const edge = data?.edge_modules || {};
  const count = data?.estimated_persons || 0;
  const hr = vs.heart_rate_bpm || vs.hr_proxy_bpm || 0;
  const br = vs.breathing_rate_bpm || vs.breathing_bpm || 0;
  const tempC = tempFrom(vs);
  const issues = [];

  if (cls.fall_detected || edge.fall_detect?.detected) {
    pushIssue(issues, 'critical', 'Fall pattern detected', [
      'Trigger caregiver response and verify the person is reachable.',
      'Keep monitoring respiratory rate, heart rate, and movement for recovery.',
    ]);
  }

  if (cls.apnea_detected || edge.sleep_apnea?.state === 'apnea_event') {
    pushIssue(issues, 'critical', 'Respiratory pause pattern detected', [
      'Escalate the sleep-monitoring alert and confirm airway status.',
      'Check for resumed breathing before clearing the event.',
    ]);
  } else if (br > 0 && (br < 8 || br > 28)) {
    pushIssue(issues, 'watch', 'Respiratory rate outside expected range', [
      'Check signal quality and recent movement before treating this as persistent.',
      'Escalate if the respiratory trend stays outside range for multiple windows.',
    ]);
  }

  if (hr > 0 && (hr < 45 || hr > 130)) {
    pushIssue(issues, hr > 150 || hr < 40 ? 'critical' : 'watch', 'Heart-rate estimate outside expected range', [
      'Confirm with a second sensor or manual check if available.',
      'Reduce motion artifacts and review the next stable window.',
    ]);
  }

  if (tempC > 0) {
    if (tempC >= HIGH_FEVER_TEMP_C || tempC <= HYPOTHERMIA_TEMP_C) {
      pushIssue(issues, 'critical', 'Body temperature is in a critical band', [
        'Validate the thermal sensor reading and escalate care response.',
        'Keep the room count low and continue trend capture.',
      ]);
    } else if (tempC >= FEVER_TEMP_C || tempC < NORMAL_TEMP_MIN_C || tempC > NORMAL_TEMP_MAX_C) {
      pushIssue(issues, 'watch', 'Body temperature needs attention', [
        'Recheck temperature after the next sensing window.',
        'Compare against recent baseline before taking action.',
      ]);
    }
  }

  if (count > 8) {
    pushIssue(issues, 'critical', 'Room occupancy exceeds the RuVigil limit', [
      'Reduce room occupancy to eight people or fewer.',
      'Split monitoring across zones if more people must remain inside.',
    ]);
  } else if (count >= 7) {
    pushIssue(issues, 'watch', 'Room is near the eight-person limit', [
      'Keep the space below the configured capacity limit.',
      'Prefer multi-node coverage for dense occupancy.',
    ]);
  }

  if (edge.gait_analysis?.fall_risk && edge.gait_analysis.fall_risk !== 'none') {
    pushIssue(issues, 'watch', 'Gait pattern suggests elevated fall risk', [
      'Review recent gait symmetry and transition events.',
      'Increase fall-detection sensitivity for this room if confirmed.',
    ]);
  }

  if (issues.length === 0) {
    return {
      severity: 'normal',
      summary: 'Vitals and occupancy are within the configured watch bands.',
      recommendations: ['Continue monitoring the current room state.'],
      metrics: { heart_rate_bpm: hr || null, respiratory_rate_bpm: br || null, body_temperature_c: tempC || null, estimated_persons: count },
    };
  }

  issues.sort((a, b) => severityRank(b.severity) - severityRank(a.severity));
  const top = issues[0];
  const recommendations = [];
  for (const issue of issues) {
    for (const rec of issue.recommendations) {
      if (!recommendations.includes(rec)) recommendations.push(rec);
      if (recommendations.length >= 4) break;
    }
    if (recommendations.length >= 4) break;
  }

  return {
    severity: top.severity,
    summary: top.summary,
    recommendations,
    metrics: { heart_rate_bpm: hr || null, respiratory_rate_bpm: br || null, body_temperature_c: tempC || null, estimated_persons: count },
  };
}
