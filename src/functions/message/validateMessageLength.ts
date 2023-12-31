import { MessageConfiguration } from '@interfaces/messageConfiguration';
import { MessageLengthValidationResult } from '@interfaces/messageLengthValidationResult';

export const validateMessageLength = (
  message: string,
  messageConfiguration: MessageConfiguration,
): MessageLengthValidationResult => {
  const errors: string[] = [];

  const { messageMinLength, messageExtractRegex } = messageConfiguration;

  const messageOnlyPattern = new RegExp(messageExtractRegex, 'i');

  const matchMessageOnlyPattern = RegExp(messageOnlyPattern).exec(message);

  const trimmedMessage = matchMessageOnlyPattern
    ? matchMessageOnlyPattern[0]?.trim()
    : message?.trim();

  if (trimmedMessage?.length < messageMinLength) {
    const baseValidationMessage = `Commit message should be at least ${messageMinLength} characters long`;

    const message = matchMessageOnlyPattern
      ? `${baseValidationMessage} (excluding ticket)`
      : baseValidationMessage;

    errors.push(message);

    return {
      errors,
      messageLength: trimmedMessage?.length,
    };
  }

  return {
    errors,
  };
};
