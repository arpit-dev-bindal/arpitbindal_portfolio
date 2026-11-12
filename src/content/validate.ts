import type { DatePoint, Period, Portfolio } from './types.ts';

const patterns = { year: /^\d{4}$/, month: /^\d{4}-\d{2}$/, day: /^\d{4}-\d{2}-\d{2}$/ };
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function dateError(point: DatePoint): string | null {
  if (point.precision === 'unknown') {
    return point.value === null && point.certainty === 'unknown' ? null : 'unknown date needs null value and unknown certainty';
  }
  if (point.value === null || !patterns[point.precision].test(point.value)) return 'date precision does not match value';
  if (point.certainty === 'unknown') return 'known date needs stated or approximate certainty';
  const day = point.precision === 'year' ? `${point.value}-01-01` : point.precision === 'month' ? `${point.value}-01` : point.value;
  const parsed = new Date(`${day}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== day) return 'invalid calendar date';
  return null;
}

function bounds(point: DatePoint): [string, string] | null {
  if (point.value === null || dateError(point)) return null;
  if (point.precision === 'year') return [`${point.value}-01-01`, `${point.value}-12-31`];
  if (point.precision === 'month') {
    const [year, month] = point.value.split('-').map(Number);
    const end = new Date(Date.UTC(year!, month!, 0)).toISOString().slice(0, 10);
    return [`${point.value}-01`, end];
  }
  return [point.value, point.value];
}

export function validatePortfolio(data: Portfolio, asOf = data.asOf): string[] {
  const errors: string[] = [];
  if (data.schemaVersion !== 1) errors.push('Unsupported schema version');
  for (const [name, value] of [['review date', data.asOf], ['check date', asOf]]) {
    if (dateError({ value: value!, precision: 'day', certainty: 'stated' })) errors.push(`Invalid ${name}`);
  }
  const ids = (items: { id: string }[], name: string) => {
    const set = new Set<string>();
    for (const item of items) {
      if (!item.id.trim()) errors.push(`${name}: empty ID`);
      if (set.has(item.id)) errors.push(`${name}: duplicate ID ${item.id}`);
      set.add(item.id);
    }
    return set;
  };
  const sources = ids(data.sources, 'source');
  const records = ids(data.records, 'record');
  const checkSources = (references: string[], supported: boolean, label: string) => {
    if (supported && references.length === 0) errors.push(`${label}: supported text needs a source`);
    for (const id of references) if (!sources.has(id)) errors.push(`${label}: unknown source ${id}`);
  };
  for (const record of data.records) {
    checkSources(record.sourceIds, record.reviewState === 'supported', record.id);
    ids(record.claims, `${record.id} claim`);
    for (const claim of record.claims) checkSources(claim.sourceIds, claim.reviewState === 'supported', `${record.id}/${claim.id}`);
    for (const id of record.relatedIds) if (!records.has(id)) errors.push(`${record.id}: unknown related record ${id}`);
    for (const [label, point] of Object.entries(record.period)) {
      const error = dateError(point);
      if (error) errors.push(`${record.id} ${label}: ${error}`);
    }
    const start = bounds(record.period.start);
    const end = bounds(record.period.end);
    if (start && end && start[0] > end[1]) errors.push(`${record.id}: reversed period`);
    const complete = record.workState === 'completed' || record.workState === 'historical';
    if (complete && ((start && start[0] > asOf) || (end && end[0] > asOf))) errors.push(`${record.id}: future work cannot be complete`);
    if (record.workState === 'ongoing' && start && start[0] > asOf) errors.push(`${record.id}: future work cannot be ongoing`);
  }
  return errors;
}

function formatDate(point: DatePoint): string | null {
  if (point.value === null) return null;
  const [year, month, day] = point.value.split('-');
  const label = point.precision === 'year' ? year : `${day ? `${Number(day)} ` : ''}${months[Number(month) - 1]} ${year}`;
  return `${point.certainty === 'approximate' ? 'approximately ' : ''}${label}`;
}

export function formatPeriod(period: Period): string | null {
  for (const point of [period.start, period.end]) {
    const error = dateError(point);
    if (error) throw new Error(error);
  }
  const start = formatDate(period.start);
  const end = formatDate(period.end);
  if (start && end) return start === end ? start : `${start} – ${end}`;
  return start ? `From ${start}` : end ? `Until ${end}` : null;
}

export function getPublicRecords(data: Portfolio, asOf = data.asOf) {
  const errors = validatePortfolio(data, asOf);
  if (errors.length) throw new Error(errors.join('\n'));
  const supported = data.records.filter(record => record.reviewState === 'supported');
  const visibleIds = new Set(supported.map(record => record.id));
  return supported.map(record => ({
    id: record.id, kind: record.kind, title: record.title,
    organization: record.organization, context: record.context, role: record.role,
    periodLabel: formatPeriod(record.period), workState: record.workState,
    summary: record.summary,
    claims: record.claims.filter(claim => claim.reviewState === 'supported').map(claim => claim.text),
    relatedIds: record.relatedIds.filter(id => visibleIds.has(id)),
  }));
}
