import assert from 'node:assert/strict';
import { test } from 'node:test';
import { portfolio, profile } from '../src/content/portfolio.ts';
import { getPublicRecords, validatePortfolio } from '../src/content/validate.ts';

test('career records pass checks at the source review date', () => {
  assert.deepEqual(validatePortfolio(portfolio), []);
  assert.ok(getPublicRecords(portfolio).length > 20);
});

test('all earlier projects retain the SMDEVOPS employment link', () => {
  const archive = portfolio.records.filter(record => record.kind === 'project' && record.organization === 'SMDEVOPS LLP');
  assert.equal(archive.length, 6);
  for (const record of archive) {
    assert.equal(record.context, 'employment');
    assert.ok(record.relatedIds.includes('smdevops'));
    assert.equal(record.period.start.value, null);
  }
});

test('AI records distinguish Lighthouse from later freelance and personal work', () => {
  const memory = portfolio.records.find(record => record.id === 'agent-memory');
  assert.equal(memory.context, 'employment');
  assert.ok(memory.relatedIds.includes('backupdata'));
  const later = portfolio.records.filter(record => record.kind === 'ai-area');
  assert.equal(later.length, 5);
  for (const record of later) {
    assert.equal(record.context, 'freelance-and-personal');
    assert.equal(record.workState, 'unknown');
    assert.equal(record.period.start.value, null);
  }
});

test('November remains a plan without a completion claim', () => {
  const record = getPublicRecords(portfolio, '2026-12-01').find(record => record.id === 'ai-november');
  assert.equal(record.workState, 'planned');
  assert.match(record.summary, /plan/i);
});

test('public profile identifies the generated resume and excludes an unprovided testimonial', () => {
  assert.equal(profile.resume.path, '/resume/arpit-bindal.pdf');
  assert.equal(profile.resume.source, 'Portfolio content records');
  assert.equal(profile.testimonial, null);
  assert.equal(profile.contact.email, 'contact@arpitbindal.com');
});
