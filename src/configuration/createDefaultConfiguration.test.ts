import { createDefaultConfiguration } from '../configuration/createDefaultConfiguration';
import { ConfigurationDefaults } from '../interfaces/configurationDefaults';

describe('createDefaultConfiguration', () => {
  it('should create default configuration with no defaults provided', () => {
    const config = createDefaultConfiguration({});

    expect(config).toHaveProperty('jiraIssuePrefix', 'JIRA');

    expect(config).toHaveProperty('jiraTicketLength', '1,');

    expect(config).toHaveProperty('jiraTicketExample', 'JIRA-1234');

    expect(config).toHaveProperty('branchConfiguration');

    expect(config).toHaveProperty('messageConfiguration');
  });

  it('should create configuration with custom defaults', () => {
    const defaults: ConfigurationDefaults = {
      jiraIssuePrefix: 'TEST',
      jiraTicketLength: '5',
      jiraTicketExample: 'TEST-54321',
    };

    const config = createDefaultConfiguration(defaults);

    expect(config.jiraIssuePrefix).toBe('TEST');

    expect(config.jiraTicketLength).toBe('5');

    expect(config.jiraTicketExample).toBe('TEST-54321');
  });

  it('should create proper branchRegex based on defaults', () => {
    const defaults: ConfigurationDefaults = {
      jiraIssuePrefix: 'FOO',
      jiraTicketLength: '4',
    };

    const config = createDefaultConfiguration(defaults);

    expect(config.branchConfiguration.branchRegex).toBe(
      '^(feature|hotfix|revert|release|build|ci|docs|fix|performance|refactor|test)-FOO-[0-9]{4}(?:-[a-z0-9]+)*$',
    );
  });

  it('should create proper messageJiraPrefixRegex based on defaults', () => {
    const defaults: ConfigurationDefaults = {
      jiraIssuePrefix: 'FOO',
      jiraTicketLength: '3',
    };

    const config = createDefaultConfiguration(defaults);

    expect(config.messageConfiguration.messageJiraPrefixRegex).toBe(
      '^FOO-[0-9]{3}(?![0-9])(?=\\s*:\\s*)\\s*:\\s*',
    );
  });

  it('should create proper messageExtractRegex based on defaults', () => {
    const defaults: ConfigurationDefaults = {
      jiraIssuePrefix: 'BAR',
      jiraTicketLength: '2,',
    };

    const config = createDefaultConfiguration(defaults);

    expect(config.messageConfiguration.messageExtractRegex).toBe(
      '(?<=BAR-[0-9]{2,}\\s*:\\s*)\\S.*',
    );
  });

  it('should handle empty jiraIssuePrefix correctly', () => {
    const defaults: ConfigurationDefaults = {
      jiraIssuePrefix: '',
      jiraTicketLength: '1,4',
    };

    const config = createDefaultConfiguration(defaults);

    expect(config.jiraIssuePrefix).toBe('');

    expect(config.jiraTicketExample).toBe('-1234');

    expect(config.branchConfiguration.branchJiraTicketRegex).toBe(
      '-[0-9]{1,4}(?![0-9])',
    );
  });

  it('should handle empty jiraTicketLength correctly', () => {
    const defaults: ConfigurationDefaults = {
      jiraIssuePrefix: 'TICK',
      jiraTicketLength: '',
    };

    const config = createDefaultConfiguration(defaults);

    expect(config.jiraTicketLength).toBe('');

    expect(config.branchConfiguration.branchJiraTicketRegex).toBe(
      'TICK-[0-9]{}(?![0-9])',
    );
  });
});
