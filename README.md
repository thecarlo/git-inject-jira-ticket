# git-inject-jira-ticket [![Build status](https://github.com/thecarlo/git-inject-jira-ticket/actions/workflows/build.yml/badge.svg)](https://github.com/thecarlo/git-inject-jira-ticket/actions/workflows/build.yml) [![@humankode/git-inject-jira-ticket on npm](https://img.shields.io/npm/v/@humankode/git-inject-jira-ticket)](https://www.npmjs.com/package/@humankode/git-inject-jira-ticket)

> A git hook script to automatically inject the Jira ticket in a commit message

For example:

branch:

- `feature-JIRA-1234`
- or `feature-JIRA-1234-implement-caching`
- or `feature/JIRA-1234-implement-caching`
- or `feature/JIRA-1234/implement-caching` etc.

commit:

`git commit -m "implement caching"`

//=> `JIRA-1234: implement caching`

## Usage

Install and configure [Husky](https://www.npmjs.com/package/husky)

`.husky/prepare-commit-msg`

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --yes @humankode/git-inject-jira-ticket@latest
```

## Zero config by default

Zero configuration by default.

If no configuration specified, it will use `JIRA-1234` as the Jira ticket pattern.

## Configuration

To override the default configuration, place a file called `gitInjectJiraTicket.json` in your root directory.

Refer to the [Configuration](src/interfaces/configuration.ts) interface for all options.

### Example configurations

### 1. Override the Jira Project Key

`gitInjectJiraTicket.json`

```
{
  "jiraIssuePrefix": "FOO"
}
```

For example

It will expect Jira tickets to be in the format of `FOO-1234`

Valid branches would be `feature-FOO-1234`, `feature-FOO-1234-some-message`, `feature/FOO-1234` etc.

### 2. Override the Jira Ticket Number's Number of Expected Digits

The default value for `jiraTicketLength` is `1,` which means that the Jira ticket is expected to have 1 or more digits.
For example, these would all be valid: `JIRA-1`, `JIRA-12`, `JIRA-12324` etc.

To change this to only have 4 digits:

`gitInjectJiraTicket.json`

```
{
  "jiraTicketLength": "4"
}
```

Now only 4 digits would be valid, for example: `JIRA-1234`

### 3. Capitalize commit messages

The default value for `capitalizeMessage` is `true`.

This capitalizes the first letter of the commit message.

For example:

branch: `feature-JIRA-1234`

`git commit -m "some message. with another sentence"`

//=> `JIRA-1234: Some message. with another sentence`

To override `capitalizeMessage`:

`gitInjectJiraTicket.json`

```
{
  "messageConfiguration": {
    "capitalizeMessage": false
  }
}

```

## Maintainers

- [Carlo van Wyk](https://github.com/thecarlo)
