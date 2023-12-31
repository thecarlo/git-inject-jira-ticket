import { validateJiraTicketFormatInMessage } from './validateJiraTicketFormatInMessage';

describe('validateJiraTicketFormatInMessage', () => {
  it('returns no errors when the ticket is valid and correctly prefixed', () => {
    const result = validateJiraTicketFormatInMessage(true, true);

    expect(result).toEqual([]);
  });

  it('returns an error when the ticket is in the message but not prefixed', () => {
    const result = validateJiraTicketFormatInMessage(true, false);

    expect(result).toEqual([
      'Jira ticket is not prefixed in the commit message',
    ]);
  });
});
