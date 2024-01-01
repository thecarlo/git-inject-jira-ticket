import { merge } from 'lodash';

import { lilconfig } from 'lilconfig';

import { Configuration } from '@interfaces/configuration';
import { ConfigurationDefaults } from '@interfaces/configurationDefaults';

import { createDefaultConfiguration } from './createDefaultConfiguration';

export const loadConfiguration = async (): Promise<Configuration> => {
  const explorer = lilconfig('git-inject-jira-ticket', {
    searchPlaces: ['gitInjectJiraTicket.json'],
  });

  const jsonConfiguration = await explorer.search();

  const configurationDefaults: ConfigurationDefaults = {
    ...(jsonConfiguration?.config.jiraIssuePrefix
      ? { jiraIssuePrefix: jsonConfiguration.config.jiraIssuePrefix }
      : {}),
    ...(jsonConfiguration?.config.jiraTicketExample
      ? { jiraTicketExample: jsonConfiguration.config.jiraTicketExample }
      : {}),
    ...(jsonConfiguration?.config.jiraTicketLength
      ? { jiraTicketLength: jsonConfiguration.config.jiraTicketLength }
      : {}),
  };

  const defaultConfiguration = createDefaultConfiguration(
    configurationDefaults,
  );

  if (!jsonConfiguration) {
    return defaultConfiguration;
  }

  const configuration: Configuration = jsonConfiguration.config;

  if (!configuration) {
    return defaultConfiguration;
  }

  if (
    !configuration.jiraIssuePrefix &&
    !configuration.branchConfiguration &&
    !configuration.messageConfiguration
  ) {
    return defaultConfiguration;
  }

  const mergedConfig = merge({}, defaultConfiguration, configuration);

  return mergedConfig;
};
