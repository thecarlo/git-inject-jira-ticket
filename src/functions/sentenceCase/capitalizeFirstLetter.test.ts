import { capitalizeFirstLetter } from './capitalizeFirstLetter';

describe('capitalizeFirstLetter', () => {
  it('should only capitalize the first letter of the first sentence', () => {
    const message = 'oh hai. friends. hai.';

    const expected = 'Oh hai. friends. hai.';

    const result = capitalizeFirstLetter(message);

    expect(result).toEqual(expected);
  });

  it('should handle empty string', () => {
    const message = '';

    const expected = '';

    const result = capitalizeFirstLetter(message);

    expect(result).toEqual(expected);
  });

  it('should handle single sentence', () => {
    const message = 'hello';

    const expected = 'Hello';

    const result = capitalizeFirstLetter(message);

    expect(result).toEqual(expected);
  });
});
