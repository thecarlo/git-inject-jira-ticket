import { promises as fsPromises } from 'fs';

import chalk from 'chalk';

import { capitalizeMessage } from '@functions/sentenceCase/capitalizeMessage';
import { TicketFromMessage } from '@interfaces/ticketFromMessage';

import { getCommitEditMessagePath } from './getCommitEditMessagePath';

export const updateCommitMessage = async (
  currentMessage: string,
  ticketFromMessage: TicketFromMessage,
  jiraTicketFromBranch: string,
  capitalize: boolean,
): Promise<void> => {
  try {
    const { isTicketInMessage } = ticketFromMessage;

    const messageFilePath = await getCommitEditMessagePath();

    const updatedMessage = !isTicketInMessage
      ? `${jiraTicketFromBranch}: ${currentMessage}`
      : currentMessage;

    const message = capitalize
      ? capitalizeMessage(updatedMessage)
      : updatedMessage;

    await fsPromises.writeFile(messageFilePath, message);

    if (!isTicketInMessage) {
      console.log(
        '✅',
        `Prefixed commit message with Jira ticket`,
        `'` + chalk.gray(`${jiraTicketFromBranch}`) + `'`,
      );
    }
  } catch (error) {
    console.error(`error: failed to update commit message`);

    process.exit(1);
  }
};
