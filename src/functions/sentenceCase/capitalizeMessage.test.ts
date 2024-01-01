import { capitalizeMessage } from './capitalizeMessage';

describe('capitalizeMessage', () => {
  describe('message is prefixed with a Jira ticket', () => {
    it('should capitalize the first letter of a sentence when the message is prefixed with a Jira ticket', () => {
      const message = 'JIRA-1234: hello world';

      const capitalizedMessage = capitalizeMessage(message);

      expect(capitalizedMessage).toBe('JIRA-1234: Hello world');
    });

    it(`should only capitalize the first letter of the first word if there's multiple sentences`, () => {
      const message = 'JIRA-1234: hai friends. how are you';

      const capitalizedMessage = capitalizeMessage(message);

      expect(capitalizedMessage).toBe('JIRA-1234: Hai friends. how are you');
    });
  });

  it('should handle empty strings', () => {
    const message = '';

    const capitalizedMessage = capitalizeMessage(message);

    expect(capitalizedMessage).toBe('');
  });
});
