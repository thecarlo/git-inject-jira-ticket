import { promises as fsPromises } from 'fs';

import chalk from 'chalk';

import { getCommitEditMessagePath } from './getCommitEditMessagePath';

export const updateCurrentCommitMessage = async (
  currentMessage: string,
  jiraTicket: string,
): Promise<void> => {
  try {
    const messageFilePath = await getCommitEditMessagePath();

    const updatedMessage = `${jiraTicket}: ${currentMessage}`;

    await fsPromises.writeFile(messageFilePath, updatedMessage);

    console.log(
      '✅',
      `Prefixed commit message with Jira ticket`,
      `'` + chalk.gray(`${jiraTicket}`) + `'`,
    );
  } catch (error) {
    console.error(`error: failed to update commit message`);

    process.exit(1);
  }
};
