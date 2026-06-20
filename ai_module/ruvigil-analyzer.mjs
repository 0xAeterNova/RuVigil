#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { analyzeFrame } from './analyzer-core.mjs';

function usage() {
  return [
    'Usage: node ai_module/ruvigil-analyzer.mjs <frames.json|frames.jsonl|frames.csv>',
    '',
    'The input may be:',
    '- a single sensing frame JSON object',
    '- a JSON array of frames',
    '- newline-delimited JSON frames',
    '- a CSV with columns like scenario, estimated_persons, heart_rate_bpm, respiratory_rate_bpm, body_temperature_c',
  ].join('\n');
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const headers = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cells = line.split(',');
    const row = {};
    headers.forEach((header, i) => {
      const value = (cells[i] ?? '').trim();
      row[header] = value === '' ? null : value;
    });
    return row;
  });
}

function parseInput(text, filePath) {
  const ext = extname(filePath).toLowerCase();
  if (ext === '.csv') return parseCsv(text);
  if (ext === '.jsonl') {
    return text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  }

  const parsed = JSON.parse(text);
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed.frames)) return parsed.frames;
  return [parsed];
}

const filePath = process.argv[2];
if (!filePath) {
  console.error(usage());
  process.exit(1);
}

try {
  const text = await readFile(filePath, 'utf8');
  const frames = parseInput(text, filePath);
  const results = frames.map((frame, index) => ({
    index,
    timestamp: frame.timestamp ?? frame.timestamp_ms ?? frame.ts ?? null,
    scenario: frame.scenario ?? null,
    analysis: analyzeFrame(frame),
  }));
  const critical_count = results.filter((r) => r.analysis.severity === 'critical').length;
  const watch_count = results.filter((r) => r.analysis.severity === 'watch').length;
  console.log(JSON.stringify({
    ok: true,
    analyzed_frames: results.length,
    critical_count,
    watch_count,
    results,
  }, null, 2));
} catch (error) {
  console.error(JSON.stringify({
    ok: false,
    error: error instanceof Error ? error.message : String(error),
  }, null, 2));
  process.exit(1);
}
