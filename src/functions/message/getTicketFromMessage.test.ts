import { createDefaultConfiguration } from '@configuration/createDefaultConfiguration';

import { getTicketFromMessage } from './getTicketFromMessage';

describe('getTicketFromMessage', () => {
  const defaultConfig = createDefaultConfiguration({});

  it(`should retrieve the ticket if there's a valid Jira ticket in the message`, () => {
    const message = 'JIRA-1234: Implement caching';

    const result = getTicketFromMessage(message, defaultConfig);

    expect(result).toEqual({
      isTicketInMessage: true,
      isTicketPrefixed: true,
      ticket: 'JIRA-1234',
    });
  });

  it(`should return isTicketPrefixed=false for a Jira ticket without ':'`, () => {
    const message = 'JIRA-1234';

    const result = getTicketFromMessage(message, defaultConfig);

    expect(result).toEqual({
      isTicketInMessage: true,
      isTicketPrefixed: false,
    });
  });

  it(`should return isTicketPrefixed=true for a Jira ticket with spacing around ' : '`, () => {
    const message = 'JIRA-1234 : foo';

    const result = getTicketFromMessage(message, defaultConfig);

    expect(result).toEqual({
      isTicketInMessage: true,
      isTicketPrefixed: true,
      ticket: 'JIRA-1234',
    });
  });

  it('should detect a valid Jira ticket in the message but not prefixed', () => {
    const message = 'Implement caching JIRA-1234';

    const result = getTicketFromMessage(message, defaultConfig);

    expect(result).toEqual({
      isTicketInMessage: true,
      isTicketPrefixed: false,
    });
  });

  it('should return false for both isTicketInMessage and isTicketPrefixed when message is empty', () => {
    const result = getTicketFromMessage('', defaultConfig);

    expect(result).toEqual({
      isTicketInMessage: false,
      isTicketPrefixed: false,
    });
  });

  it('should handle a message with no Jira ticket', () => {
    const message = 'Implement caching without any Jira ticket';

    const result = getTicketFromMessage(message, defaultConfig);

    expect(result).toEqual({
      isTicketInMessage: false,
      isTicketPrefixed: false,
    });
  });
});
