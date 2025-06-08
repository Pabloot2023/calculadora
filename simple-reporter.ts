// simple-reporter.ts
import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class SimpleReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult) {
    const status = result.status;
    const icon = status === 'passed' ? '✅' :
                 status === 'failed' ? '❌' :
                 status === 'skipped' ? '⏭️' :
                 '❓';

    console.log(`Test: ${test.title} - status: ${status} ${icon}`);
  }
}

export default SimpleReporter;
