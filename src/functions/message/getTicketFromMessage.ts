import { Configuration } from '@interfaces/configuration';
import { TicketFromMessage } from '@interfaces/ticketFromMessage';

export const getTicketFromMessage = (
  message: string,
  configuration: Configuration,
): TicketFromMessage => {
  if (!message) {
    return {
      isTicketInMessage: false,
      isTicketPrefixed: false,
    };
  }

  const { messageConfiguration } = configuration;

  const { messageJiraPrefixRegex, messageJiraRegex } = messageConfiguration;

  const ticketPattern = new RegExp(messageJiraRegex, 'i');

  const matchTicketPattern = RegExp(ticketPattern).exec(message);

  const ticketPrefixPattern = new RegExp(messageJiraPrefixRegex, 'i');

  const matchTicketPrefixPattern = RegExp(ticketPrefixPattern).exec(message);

  if (!matchTicketPattern) {
    return {
      isTicketInMessage: false,
      isTicketPrefixed: false,
    };
  }

  //commit message has a ticket in valid format but it's not prefixed
  const isTicketInMessage = !!matchTicketPattern;

  //commit message has a ticket in valid format and it's prefixed
  const isTicketPrefixed = !!matchTicketPrefixPattern;

  return {
    isTicketInMessage,
    isTicketPrefixed,
    ...(matchTicketPrefixPattern
      ? {
          ticket: matchTicketPattern[0].trim().toUpperCase(),
        }
      : {}),
  };
};
