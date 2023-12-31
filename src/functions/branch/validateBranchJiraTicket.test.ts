import { createDefaultConfiguration } from '@configuration/createDefaultConfiguration';
import { Configuration } from '@interfaces/configuration';

import { validateBranchJiraTicket } from './validateBranchJiraTicket';

describe('validateBranchJiraTicket', () => {
  let defaultConfig: Configuration;

  beforeAll(() => {
    defaultConfig = createDefaultConfiguration({});
  });

  it('should return true for valid branch with correct JIRA ticket and description', () => {
    const branch = 'feature-JIRA-1234-implement-caching';

    expect(
      validateBranchJiraTicket(branch, defaultConfig.branchConfiguration),
    ).toBe(true);
  });

  it('should return true for branch with no description', () => {
    const branch = 'feature-JIRA-1000';

    expect(
      validateBranchJiraTicket(branch, defaultConfig.branchConfiguration),
    ).toBe(true);
  });

  it('should return false for valid branch with incorrect JIRA ticket', () => {
    const branch = 'feature-JJJJ-123-implement-caching';

    expect(
      validateBranchJiraTicket(branch, defaultConfig.branchConfiguration),
    ).toBe(false);
  });

  it('should return true for valid branch with JIRA ticket that has only 2 digits', () => {
    const branch = 'feature-JIRA-12-implement-caching';

    expect(
      validateBranchJiraTicket(branch, defaultConfig.branchConfiguration),
    ).toBe(true);
  });

  it('should return false for branch with missing JIRA ticket', () => {
    const branch = 'feature-implement-caching';

    expect(
      validateBranchJiraTicket(branch, defaultConfig.branchConfiguration),
    ).toBe(false);
  });

  it('should return false for empty branch', () => {
    const branch = '';

    expect(
      validateBranchJiraTicket(branch, defaultConfig.branchConfiguration),
    ).toBe(false);
  });

  it('should return true for branch with incorrect prefix (should only validate Jira ticket)', () => {
    const branch = 'foo-JIRA-1234-implement-caching';

    expect(
      validateBranchJiraTicket(branch, defaultConfig.branchConfiguration),
    ).toBe(true);
  });
});
