export interface MessageConfiguration {
  capitalizeMessage: boolean;
  messageJiraPrefixRegex: string; // regex to validate if message is prefixed with a Jira ticket
  messageJiraRegex: string; // regex to validate if Jira ticket is anywhere in the message
  messageExtractRegex: string; // regex to extract only the message from a commit message with a jira ticket and a message
  messageExample: string;
  messageExampleWithMessage: string;
  messageMinLength: number;
}
