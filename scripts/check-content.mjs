import { portfolio } from '../src/content/portfolio.ts';
import { validatePortfolio } from '../src/content/validate.ts';

const errors = validatePortfolio(portfolio);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  const gaps = portfolio.records.filter(record => record.gaps.length);
  console.log(`Content checks passed: ${portfolio.records.length} records; ${portfolio.sources.length} sources.`);
  console.log(`Source review date: ${portfolio.asOf}.`);
  console.log(`${gaps.length} records need further evidence. These gaps do not confirm release readiness.`);
}
