import * as configModule from 'lilconfig';

import { createDefaultConfiguration } from './createDefaultConfiguration';
import { loadConfiguration } from './loadConfiguration';

jest.mock('lilconfig');

describe('loadConfiguration', () => {
  const mockLilconfig = configModule.lilconfig as jest.MockedFunction<
    typeof configModule.lilconfig
  >;

  const mockSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockLilconfig.mockReturnValue({ search: mockSearch } as any);
  });

  it('returns default configuration if no config found', async () => {
    mockSearch.mockResolvedValue(null);

    const defaultConfiguration = createDefaultConfiguration({});

    const result = await loadConfiguration();

    expect(result).toEqual(defaultConfiguration);
  });

  it('returns default configuration if found config is empty', async () => {
    mockSearch.mockResolvedValue({ config: {} });

    const defaultConfiguration = createDefaultConfiguration({});

    const result = await loadConfiguration();

    expect(result).toEqual(defaultConfiguration);
  });

  it('returns merged configuration if found config has values', async () => {
    const customConfig = {
      jiraIssuePrefix: 'CUSTOM',
      branchConfiguration: { branchTypes: ['custom'] },
      messageConfiguration: { capitalizeMessage: false },
    };

    mockSearch.mockResolvedValue({ config: customConfig });

    const result = await loadConfiguration();

    expect(result.jiraIssuePrefix).toEqual('CUSTOM');

    expect(result.branchConfiguration.branchTypes).toEqual(['custom']);

    expect(result.messageConfiguration.capitalizeMessage).toEqual(false);
  });

  it('handles conditional defaults when specific config properties are provided', async () => {
    const customConfig = {
      jiraIssuePrefix: 'FOO',
      jiraTicketExample: 'FOO-1234',
    };

    mockSearch.mockResolvedValue({ config: customConfig });

    const result = await loadConfiguration();

    expect(result.jiraIssuePrefix).toEqual('FOO');

    expect(result.jiraTicketExample).toEqual('FOO-1234');
  });

  it('handles conditional defaults when no specific config properties are provided', async () => {
    const customConfig = {};

    mockSearch.mockResolvedValue({ config: customConfig });

    const defaultConfiguration = createDefaultConfiguration({});

    const result = await loadConfiguration();

    expect(result.jiraIssuePrefix).toEqual(
      defaultConfiguration.jiraIssuePrefix,
    );

    expect(result.jiraTicketExample).toEqual(
      defaultConfiguration.jiraTicketExample,
    );
  });
});
