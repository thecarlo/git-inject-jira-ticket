import chalk from 'chalk';

import { getTicketFromBranch } from '@functions/branch/getTicketFromBranch';
import { isCherryPickInProgress } from '@functions/branch/isCherryPickInProgress';
import { isMergeInProgress } from '@functions/branch/isMergeInProgress';
import { isRebaseInProgress } from '@functions/branch/isRebaseInProgress';
import { getTicketFromMessage } from '@functions/message/getTicketFromMessage';
import { Configuration } from '@interfaces/configuration';
import { ValidateMessageResult } from '@interfaces/validateMessageResult';

import { validateCommitMessageWithJiraTicket } from './validateCommitMessageWithJiraTicket';
import { validateJiraTicketFormatInMessage } from './validateJiraTicketFormatInMessage';
import { validateMessageLength } from './validateMessageLength';

export const validateMessage = async (
  branch: string,
  message: string,
  configuration: Configuration,
): Promise<ValidateMessageResult> => {
  let hasValidationError = false;

  const isRebase = await isRebaseInProgress();

  const isMerge = await isMergeInProgress();

  const isCherryPick = await isCherryPickInProgress();

  if (isRebase || isMerge || isCherryPick) {
    return {
      success: true,
    };
  }

  const ticketFromMessageResult = getTicketFromMessage(message, configuration);

  const { messageConfiguration } = configuration;

  const { messageExample, messageExampleWithMessage } = messageConfiguration;

  const {
    isTicketInMessage,
    ticket: ticketFromMessage,
    isTicketPrefixed,
  } = ticketFromMessageResult;

  if (isTicketInMessage) {
    //validate that message in format 'JIRA-1234: commit message'
    const validateCommitMessageWithJiraTicketResult =
      validateCommitMessageWithJiraTicket(message, messageConfiguration);

    if (validateCommitMessageWithJiraTicketResult?.length > 0) {
      hasValidationError = true;

      validateCommitMessageWithJiraTicketResult.forEach((error) => {
        console.log(chalk.red(`✖`), `${error}`);
      });

      console.log(chalk.green(`ℹ️  Accepted message conventions:`));

      console.log(chalk.green(`    →`, `{CommitMessage}`));

      console.log(`      Example: '${messageExample}'`);

      console.log(
        `      Jira ticket will automatically be extracted and prefixed from branch name`,
      );

      console.log();

      console.log(
        chalk.green(
          `    →`,
          `{JiraPrefix}-{JiraTicketNumber}: {CommitMessage}`,
        ),
      );

      console.log(`      Example: '${messageExampleWithMessage}'`);

      console.log();
    }

    // validate message length
    const validateMessageLengthResult = validateMessageLength(
      message,
      messageConfiguration,
    );

    const { errors: lengthErrors } = validateMessageLengthResult;

    if (lengthErrors?.length > 0) {
      hasValidationError = true;

      lengthErrors.map((error: string) => {
        console.log(chalk.red(`✖`), `${error}`);
      });
    }

    // validate that jira ticket is prefixed in message
    const validateJiraTicketFormatResult = validateJiraTicketFormatInMessage(
      isTicketInMessage,
      isTicketPrefixed,
    );

    if (validateJiraTicketFormatResult?.length > 0) {
      hasValidationError = true;

      validateJiraTicketFormatResult.map((error) => {
        console.log(chalk.red(`✖`), `${error}`);
      });

      return {
        success: false,
      };
    }

    //validate that branch ticket equals commit message ticket
    const ticketFromBranch = getTicketFromBranch(branch, configuration);

    if (!ticketFromBranch) {
      console.log(chalk.red('unable to get ticket from branch'));

      process.exit(1);
    }

    if (ticketFromMessage !== ticketFromBranch) {
      hasValidationError = true;

      console.log(
        chalk.red(`✖`),
        `Commit message ticket doesn't match the branch ticket`,
      );
    }

    return {
      success: !hasValidationError,
    };
  }

  if (!isTicketInMessage) {
    // validate message length
    const validateMessageLengthResult = validateMessageLength(
      message,
      messageConfiguration,
    );

    const { errors: lengthErrors } = validateMessageLengthResult;

    if (lengthErrors?.length > 0) {
      hasValidationError = true;

      lengthErrors.map((error) => {
        console.log(chalk.red(`✖`), `${error}`);
      });

      return {
        success: !hasValidationError,
      };
    }
  }

  return {
    success: !hasValidationError,
  };
};
