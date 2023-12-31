import { Configuration } from '@interfaces/configuration';

export const getTicketFromBranch = (
  branch: string,
  configuration: Configuration,
): string => {
  const { branchConfiguration } = configuration;

  const { branchJiraTicketRegex } = branchConfiguration;

  const regexPattern = new RegExp(branchJiraTicketRegex, 'i');

  const match = RegExp(regexPattern).exec(branch);

  if (!match) {
    console.log('error: failed to extract Jira ticket from branch name');

    process.exit(1);
  }

  const jiraTicket = match[0]?.toUpperCase();

  return jiraTicket;
};
