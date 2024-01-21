import chalk from 'chalk';

import { Configuration } from '@interfaces/configuration';

import { createDefaultBranchTypes } from './createDefaultBranchTypes';
import { doBranchFullRegexCheck } from './doBranchFullRegexCheck';
import { isCherryPickInProgress } from './isCherryPickInProgress';
import { isMergeInProgress } from './isMergeInProgress';
import { isRebaseInProgress } from './isRebaseInProgress';
import { validateBranchJiraTicket } from './validateBranchJiraTicket';
import { validateBranchPrefix } from './validateBranchPrefix';

export const validateBranch = async (
  branch: string,
  configuration: Configuration,
): Promise<void> => {
  const { branchConfiguration, jiraTicketExample } = configuration;

  const branchRegexSuccess = doBranchFullRegexCheck(
    branch,
    branchConfiguration,
  );

  const isRebase = await isRebaseInProgress();

  const isMerge = await isMergeInProgress();

  const isCherryPick = await isCherryPickInProgress();

  if (branchRegexSuccess || isRebase || isMerge || isCherryPick) {
    return;
  }

  const { branchExamples } = branchConfiguration;

  console.log(chalk.red(`✖`), `Branch validation failed`);

  console.log(chalk.green(`ℹ️`), `Valid branch formats:`);

  for (const branchExample of branchExamples) {
    console.log(chalk.green(`  →`), `'${branchExample}'`);
  }

  const branchPrefixRegexSuccess = validateBranchPrefix(
    branch,
    branchConfiguration,
  );

  if (!branchPrefixRegexSuccess) {
    const branchTypes = createDefaultBranchTypes();

    console.log();

    console.log(chalk.red(`✖`), `Branch prefix is invalid or missing`);

    console.log(
      chalk.green(`ℹ️`),
      `Valid prefixes: ${branchTypes.map((value) => `'${value}'`).join(', ')}`,
    );
  }

  const validateBranchJiraTicketSuccess = validateBranchJiraTicket(
    branch,
    branchConfiguration,
  );

  if (!validateBranchJiraTicketSuccess) {
    console.log();

    console.log(chalk.red(`✖`), `Jira ticket is invalid`);

    console.log(
      chalk.green(`ℹ️`),
      `Valid ticket example: '${jiraTicketExample}'`,
    );
  }

  if (
    !branchRegexSuccess ||
    !branchPrefixRegexSuccess ||
    !validateBranchJiraTicketSuccess
  ) {
    console.log();

    process.exit(1);
  }
};
