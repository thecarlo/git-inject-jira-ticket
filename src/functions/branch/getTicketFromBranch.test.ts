import { createDefaultConfiguration } from '@configuration/createDefaultConfiguration';

import { getTicketFromBranch } from './getTicketFromBranch';

describe('getTicketFromBranch', () => {
  const defaultConfiguration = createDefaultConfiguration({});
  let processExitSpy: jest.SpyInstance<never, [code?: number | undefined], any>;

  beforeEach(() => {
    processExitSpy = jest
      .spyOn(process, 'exit')
      .mockImplementation((number) => {
        throw new Error('process.exit: ' + number);
      });
  });

  afterEach(() => {
    processExitSpy.mockRestore();
  });

  it('should call process.exit(1) if no match is found', () => {
    expect(() => {
      getTicketFromBranch('invalid-branch-name', defaultConfiguration);
    }).toThrow('process.exit: 1');
  });

  it('should call process.exit(1) if branch is valid but without JIRA ticket', () => {
    const branch = 'feature-implement-caching';

    expect(() => {
      getTicketFromBranch(branch, defaultConfiguration);
    }).toThrow('process.exit: 1');
  });

  it('returns the ticket in uppercase if a valid branch with JIRA ticket is provided', () => {
    const branch = 'feature-JIRA-1234-implement-caching';

    expect(getTicketFromBranch(branch, defaultConfiguration)).toBe('JIRA-1234');
  });

  it('returns the first ticket in uppercase if multiple valid JIRA tickets are present', () => {
    const branch = 'feature-JIRA-1234-JIRA-5678-implement-caching';

    expect(getTicketFromBranch(branch, defaultConfiguration)).toBe('JIRA-1234');
  });

  it('should still return the Jira ticket even if the branch has an invalid branchType', () => {
    const branch = 'foo-JIRA-1234-fix-issue';

    expect(getTicketFromBranch(branch, defaultConfiguration)).toBe('JIRA-1234');
  });

  it('is case insensitive to the branch name', () => {
    const branch = 'Feature-JIRA-1234-Implement-Caching';

    expect(getTicketFromBranch(branch, defaultConfiguration)).toBe('JIRA-1234');
  });
});
