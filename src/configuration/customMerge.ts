import { isArray } from 'lodash';

// Custom merge function that replaces arrays instead of merging them
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const customMerge = (objValue: any, srcValue: any): any => {
  if (isArray(objValue)) {
    return srcValue;
  }
};
