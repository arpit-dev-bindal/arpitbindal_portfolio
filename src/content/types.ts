export type DatePoint = {
  value: string | null;
  precision: 'year' | 'month' | 'day' | 'unknown';
  certainty: 'stated' | 'approximate' | 'unknown';
};
export type Period = { start: DatePoint; end: DatePoint };
export type ReviewState = 'supported' | 'needs-review';
export type Source = {
  id: string;
  kind: 'user' | 'document' | 'website';
  label: string;
  status: 'reported' | 'draft' | 'public';
};
export type Claim = {
  id: string;
  text: string;
  sourceIds: string[];
  reviewState: ReviewState;
};
export type ContentRecord = {
  id: string;
  kind: 'education' | 'career' | 'project' | 'ai-area' | 'event' | 'plan';
  title: string;
  organization: string | null;
  context: 'education' | 'employment' | 'freelance-and-personal';
  role: string | null;
  period: Period;
  workState: 'historical' | 'ongoing' | 'planned' | 'unknown' | 'completed';
  reviewState: ReviewState;
  sourceIds: string[];
  summary: string;
  claims: Claim[];
  relatedIds: string[];
  gaps: string[];
};
export type Portfolio = {
  schemaVersion: 1;
  asOf: string;
  sources: Source[];
  records: ContentRecord[];
};
