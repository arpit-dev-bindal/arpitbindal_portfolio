import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validatePortfolio, getPublicRecords, formatPeriod } from '../src/content/validate.ts';

const date = (value, precision = 'month', certainty = 'stated') => ({ value, precision, certainty });
const unknown = () => date(null, 'unknown', 'unknown');
const fixture = () => ({
  schemaVersion: 1,
  asOf: '2026-10-24',
  sources: [{ id: 'U1', kind: 'user', label: 'User account', status: 'reported' }],
  records: [{
    id: 'sample', kind: 'project', title: 'Example', organization: 'Lighthouse',
    context: 'employment', role: null,
    period: { start: date('2022-03'), end: date('2026-08') },
    workState: 'historical', reviewState: 'supported', sourceIds: ['U1'],
    summary: 'I built a tool.', claims: [], relatedIds: [], gaps: [],
  }],
});

test('accepts known dates and explicit unknown dates', () => {
  const data = fixture();
  data.records[0].period = { start: unknown(), end: unknown() };
  assert.deepEqual(validatePortfolio(data), []);
});

test('rejects a date that exceeds its stated precision', () => {
  const data = fixture();
  data.records[0].period.start = date('2022-03-14');
  assert.match(validatePortfolio(data).join('\n'), /precision/);
});

test('rejects impossible calendar dates', () => {
  const data = fixture();
  data.records[0].period.start = date('2026-02-30', 'day');
  assert.match(validatePortfolio(data).join('\n'), /calendar/);
});

test('rejects reversed periods', () => {
  const data = fixture();
  data.records[0].period.start = date('2027-03');
  assert.match(validatePortfolio(data).join('\n'), /period/);
});

test('rejects unknown source and related record IDs', () => {
  const data = fixture();
  data.records[0].sourceIds = ['missing'];
  data.records[0].relatedIds = ['missing'];
  const errors = validatePortfolio(data).join('\n');
  assert.match(errors, /source/);
  assert.match(errors, /related/);
});

test('rejects a supported claim without a source', () => {
  const data = fixture();
  data.records[0].claims = [{ id: 'claim', text: 'I built the SDK.', sourceIds: [], reviewState: 'supported' }];
  assert.match(validatePortfolio(data).join('\n'), /source/);
});

test('rejects future work as complete', () => {
  const data = fixture();
  data.records[0].period.end = date('2026-11');
  data.records[0].workState = 'completed';
  assert.match(validatePortfolio(data).join('\n'), /future/);
});

test('does not convert planned work into complete work after its target date', () => {
  const data = fixture();
  data.records[0].period = { start: date('2026-11'), end: date('2026-11') };
  data.records[0].workState = 'planned';
  const result = getPublicRecords(data, '2026-12-01');
  assert.equal(result[0].workState, 'planned');
});

test('preserves approximate dates in public labels', () => {
  const period = { start: date('2020-01'), end: date('2021-12', 'month', 'approximate') };
  assert.equal(formatPeriod(period), 'January 2020 – approximately December 2021');
});

test('does not invent a period or a current role from unknown dates', () => {
  assert.equal(formatPeriod({ start: unknown(), end: unknown() }), null);
  assert.equal(formatPeriod({ start: date('2022-03'), end: unknown() }), 'From March 2022');
});

test('omits review-only records, claims, and internal evidence notes from public output', () => {
  const data = fixture();
  data.records[0].gaps = ['Private source details'];
  data.records[0].claims = [
    { id: 'known', text: 'I built the SDK.', sourceIds: ['U1'], reviewState: 'supported' },
    { id: 'draft', text: 'Unconfirmed result', sourceIds: [], reviewState: 'needs-review' },
  ];
  data.records.push({ ...structuredClone(data.records[0]), id: 'draft-record', reviewState: 'needs-review' });
  const result = getPublicRecords(data);
  assert.equal(result.length, 1);
  assert.deepEqual(result[0].claims, ['I built the SDK.']);
  assert.equal('gaps' in result[0], false);
  assert.equal('sourceIds' in result[0], false);
  assert.equal(JSON.stringify(result).includes('Private source details'), false);
});

test('public output rejects invalid source data', () => {
  const data = fixture();
  data.records[0].sourceIds = ['missing'];
  assert.throws(() => getPublicRecords(data), /source/);
});

test('rejects duplicate record and source IDs', () => {
  const data = fixture();
  data.records.push(structuredClone(data.records[0]));
  data.sources.push(structuredClone(data.sources[0]));
  assert.match(validatePortfolio(data).join('\n'), /duplicate/);
});
