import { BranchConfiguration } from './branchConfiguration';
import { MessageConfiguration } from './messageConfiguration';

export interface Configuration {
  jiraIssuePrefix: string; //e.g, 'JIRA' (JIRA-1234)
  jiraTicketExample: string; //e.g, 'JIRA-1234'
  jiraTicketLength: string; // e.g, '4' (4 numbers only) or '1,4' (1-4 numbers) or '1,' (1 or more numbers)
  branchConfiguration: BranchConfiguration;
  messageConfiguration: MessageConfiguration;
}
