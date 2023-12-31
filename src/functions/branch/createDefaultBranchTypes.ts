export const createDefaultBranchTypes = (): string[] => [
  'feature', //a new feature
  'hotfix', //a change made directly to the production branch to fix a critical issue that cannot wait for a regular release cycle
  'revert', //a commit that undoes the changes of a previous commit
  'release', //a branch used to merge into the main branch for a release
  'build', //changes that affect the build system or external dependencies (example scope: npm)
  'ci', //CI related changes (Jenkins)
  'docs', //documentation only changes
  'fix', //a bug fix
  'performance', //a change that improves performance
  'refactor', //a change that restructures existing code but does not change its functionality
  'test', //adding or fixing tests
];
