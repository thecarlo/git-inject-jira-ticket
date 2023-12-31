import { loadConfiguration } from '@configuration/loadConfiguration';
import { getCurrentBranchName } from '@functions/branch/getCurrentBranchName';
import { getTicketFromBranch } from '@functions/branch/getTicketFromBranch';
import { validateBranch } from '@functions/branch/validateBranch';
import { getCurrentCommitMessage } from '@functions/message/getCurrentCommitMessage';
import { getTicketFromMessage } from '@functions/message/getTicketFromMessage';
import { updateCurrentCommitMessage } from '@functions/message/updateCurrentCommitMessage';
import { validateMessage } from '@functions/message/validateMessage';

export const injectJiraTicket = async (): Promise<void> => {
  const configuration = await loadConfiguration();

  const branch = await getCurrentBranchName();

  validateBranch(branch, configuration);

  const message = await getCurrentCommitMessage();

  const validateMessageResult = validateMessage(branch, message, configuration);

  const { success: validateMessageSuccess } = validateMessageResult;

  if (!validateMessageSuccess) {
    process.exit(1);
  }

  const jiraTicket = getTicketFromBranch(branch, configuration);

  const ticketFromMessageResult = getTicketFromMessage(message, configuration);

  const { isTicketInMessage } = ticketFromMessageResult;

  if (!isTicketInMessage) {
    updateCurrentCommitMessage(message, jiraTicket);
  }
};
