import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export const capitalizeMessage = (message: string): string => {
  const splitMessage = message.split(/(?<=^\w+-\d+):/);

  if (splitMessage.length < 2) {
    // if there's no ':' following the pattern, return the original message
    return message;
  }

  const identifier = splitMessage[0];

  const capitalizedMessage = splitMessage[1];

  const capitalizedSentence = capitalizeFirstLetter(capitalizedMessage.trim());

  return `${identifier}: ${capitalizedSentence}`;
};
