import { createDefaultBranchTypes } from '@functions/branch/createDefaultBranchTypes';

import { buildBranchTypeRegexKeys } from './buildBranchTypeRegexKeys';

jest.mock('@functions/branch/createDefaultBranchTypes');

describe('buildBranchTypeRegexKeys', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (createDefaultBranchTypes as unknown as jest.Mock).mockReturnValue([
      'foo',
      'bar',
    ]);
  });

  it('should return a string with all the keys from branchTypeEmojiMap', () => {
    const result = buildBranchTypeRegexKeys();

    const joinedKeys = ['foo', 'bar'].join('|');

    const expected = `(${joinedKeys})`;

    expect(result).toEqual(expected);
  });
});
