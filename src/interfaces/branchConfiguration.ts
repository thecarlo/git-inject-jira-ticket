export interface BranchConfiguration {
  branchTypes: string[]; // valid branch types, e.g, ['feature', 'hotfix']
  branchPrefixRegex: string; // regex to validate the prefix of the branch only
  branchJiraTicketRegex: string; // regex to extract Jira ticket from branch
  branchRegex: string; // regex to validate the branch name
  branchExamples: string[];
}
