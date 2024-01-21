import { loadConfiguration } from '@configuration/loadConfiguration';
import { getCurrentBranchName } from '@functions/branch/getCurrentBranchName';
import { validateBranch } from '@functions/branch/validateBranch';
import { getCurrentCommitMessage } from '@functions/message/getCurrentCommitMessage';
import { getTicketFromMessage } from '@functions/message/getTicketFromMessage';
import { updateCommitMessage } from '@functions/message/updateCommitMessage';
import { validateMessage } from '@functions/message/validateMessage';

import { getTicketFromBranch } from './branch/getTicketFromBranch';

export const main = async (): Promise<void> => {
  const configuration = await loadConfiguration();

  const branch = await getCurrentBranchName();

  await validateBranch(branch, configuration);

  const message = await getCurrentCommitMessage();

  const validateMessageResult = await validateMessage(
    branch,
    message,
    configuration,
  );

  const { success: validateMessageSuccess } = validateMessageResult;

  if (!validateMessageSuccess) {
    process.exit(1);
  }

  const { messageConfiguration } = configuration;

  const { capitalizeMessage } = messageConfiguration;

  const jiraTicket = getTicketFromBranch(branch, configuration);

  const ticketFromMessageResult = getTicketFromMessage(message, configuration);

  await updateCommitMessage(
    message,
    ticketFromMessageResult,
    jiraTicket,
    capitalizeMessage,
  );

  process.exit(0);
};
