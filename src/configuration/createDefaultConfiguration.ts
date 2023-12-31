import { buildBranchTypeRegexKeys } from '@functions/branch/buildBranchTypeRegexKeys';
import { createDefaultBranchTypes } from '@functions/branch/createDefaultBranchTypes';
import { Configuration } from '@interfaces/configuration';
import { ConfigurationDefaults } from '@interfaces/configurationDefaults';

export const createDefaultConfiguration = (
  configurationDefaults: ConfigurationDefaults,
): Configuration => {
  const {
    jiraIssuePrefix = 'JIRA',
    jiraTicketLength = '1,',
    jiraTicketExample = `${jiraIssuePrefix}-1234`,
  } = configurationDefaults;

  const branchTypes = createDefaultBranchTypes();

  const branchTypeRegex = buildBranchTypeRegexKeys();

  const jiraRegex = `${jiraIssuePrefix}-[0-9]{${jiraTicketLength}}(?![0-9])`;

  console.log('jiraRegex', jiraRegex);

  return {
    jiraIssuePrefix,
    jiraTicketExample,
    jiraTicketLength,
    branchConfiguration: {
      branchTypes,
      branchPrefixRegex: `^${branchTypeRegex}`,
      branchJiraTicketRegex: `${jiraRegex}`,
      branchRegex: `^${branchTypeRegex}-${jiraIssuePrefix}-[0-9]{${jiraTicketLength}}(?:-[a-z0-9]+)*$`,
      branchExamples: [
        `feature-${jiraIssuePrefix}-1234`,
        `feature-${jiraIssuePrefix}-1234-implement-caching`,
      ],
    },
    messageConfiguration: {
      messageJiraPrefixRegex: `^${jiraRegex}\\s*[:]?\\s*`,
      messageJiraRegex: `${jiraRegex}`,
      messageExtractRegex: `(?<=${jiraIssuePrefix}-[0-9]{${jiraTicketLength}}\\s*:\\s*)\\S.*`,
      messageExample: `${jiraIssuePrefix}-1234`,
      messageExampleWithMessage: `${jiraIssuePrefix}-1234: Implement caching`,
      messageMinLength: 3,
    },
  };
};
