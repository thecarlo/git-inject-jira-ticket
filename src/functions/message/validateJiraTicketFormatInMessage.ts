export const validateJiraTicketFormatInMessage = (
  isTicketInMessage: boolean,
  isTicketPrefixed: boolean,
): string[] => {
  const results = [];

  if (isTicketInMessage && !isTicketPrefixed) {
    results.push('Jira ticket is not prefixed in the commit message');
  }

  return results;
};
