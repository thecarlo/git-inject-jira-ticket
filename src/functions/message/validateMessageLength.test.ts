import { createDefaultConfiguration } from '@configuration/createDefaultConfiguration';

import { validateMessageLength } from './validateMessageLength';

describe('validateMessageLength', () => {
  const defaultConfig = createDefaultConfiguration({});

  const { messageConfiguration } = defaultConfig;

  it('should return no errors for valid message length', () => {
    const message = 'JIRA-1234: This is a valid commit message';

    const result = validateMessageLength(message, messageConfiguration);

    expect(result.errors).toHaveLength(0);
  });

  it('should handle empty message gracefully', () => {
    const result = validateMessageLength('', messageConfiguration);

    expect(result.errors).toHaveLength(1);
  });

  it('should not return message length when there are no errors', () => {
    const message = 'JIRA-1234: This is a valid commit message';

    const result = validateMessageLength(message, messageConfiguration);

    expect(result.messageLength).toBeUndefined();
  });

  it('should return error for message shorter than minimum length', () => {
    const message = '12';

    const result = validateMessageLength(message, messageConfiguration);

    expect(result.errors).toHaveLength(1);

    expect(result.errors[0]).toMatch(/Commit message should be at least/);
  });

  it('should trim and validate message without Jira ticket', () => {
    const message = '12';

    const result = validateMessageLength(message, messageConfiguration);

    expect(result.errors).toHaveLength(1);
  });

  it('should trim and validate message with Jira ticket', () => {
    const message = 'JIRA-1234: 12';

    const result = validateMessageLength(message, messageConfiguration);

    expect(result.errors).toHaveLength(1);

    expect(result.errors[0]).toMatch(/excluding ticket/);
  });

  it('should return the correct message length when error occurs', () => {
    const message = 'a';

    const result = validateMessageLength(message, messageConfiguration);

    expect(result.messageLength).toBe(message.length);
  });
});
