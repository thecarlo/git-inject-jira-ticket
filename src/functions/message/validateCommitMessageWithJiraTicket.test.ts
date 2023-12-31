import { createDefaultConfiguration } from '@configuration/createDefaultConfiguration';

import { validateCommitMessageWithJiraTicket } from './validateCommitMessageWithJiraTicket';

describe('validateCommitMessageWithJiraTicket', () => {
  const configuration = createDefaultConfiguration({});

  it('should handle a valid commit message with additional colon and spaces', () => {
    const message = 'JIRA-1234 : Implement caching';

    const results = validateCommitMessageWithJiraTicket(
      message,
      configuration.messageConfiguration,
    );

    expect(results).toEqual([]);
  });

  it(`should return an error for a commit message where there is 1 Jira ticket but it's not at the start (validateJiraTicketFormatInMessage validates if it is prefixed)`, () => {
    const message = 'JIRA-123: Implement caching (updated JIRA-1235)';

    const results = validateCommitMessageWithJiraTicket(
      message,
      configuration.messageConfiguration,
    );

    expect(results).toEqual([]);
  });

  it(`should not return an error for a commit message where there is 1 Jira ticket but it's not at the start (validateJiraTicketFormatInMessage validates if it is prefixed)`, () => {
    const message = 'Implement caching JIRA-1234';

    const results = validateCommitMessageWithJiraTicket(
      message,
      configuration.messageConfiguration,
    );

    expect(results).toEqual([]);
  });

  it('should return an error if the commit message does not contain a Jira ticket', () => {
    const message = 'Commit with no Jira ticket';

    const results = validateCommitMessageWithJiraTicket(
      message,
      configuration.messageConfiguration,
    );

    expect(results).toEqual(['Commit message validation failed']);
  });

  it('should not return an error for a valid commit message with Jira ticket prefix', () => {
    const message = 'JIRA-1234: Implement caching';

    const results = validateCommitMessageWithJiraTicket(
      message,
      configuration.messageConfiguration,
    );

    expect(results).toEqual([]);
  });

  it('should return an error for a commit message with invalid Jira ticket format', () => {
    const message = 'JJJJ-123: Implement caching';

    const results = validateCommitMessageWithJiraTicket(
      message,
      configuration.messageConfiguration,
    );

    expect(results).toEqual(['Commit message validation failed']);
  });
});
