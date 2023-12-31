import { MessageConfiguration } from '@interfaces/messageConfiguration';

export const validateCommitMessageWithJiraTicket = (
  message: string,
  messageConfiguration: MessageConfiguration,
): string[] => {
  const results = [];

  const { messageJiraRegex } = messageConfiguration;

  const messagePattern = new RegExp(messageJiraRegex, 'i');

  const matchMessagePattern = RegExp(messagePattern).exec(message);

  if (!matchMessagePattern) {
    results.push(`Commit message validation failed`);
  }

  return results;
};
