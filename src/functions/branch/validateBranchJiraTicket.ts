import { BranchConfiguration } from '@interfaces/branchConfiguration';

export const validateBranchJiraTicket = (
  branch: string,
  branchConfiguration: BranchConfiguration,
): boolean => {
  const { branchJiraTicketRegex } = branchConfiguration;

  const branchJiraTicketRegExp = new RegExp(branchJiraTicketRegex, 'i');

  const matchBranchJiraTicket = RegExp(branchJiraTicketRegExp).exec(branch);

  if (matchBranchJiraTicket) {
    return true;
  }

  return false;
};
