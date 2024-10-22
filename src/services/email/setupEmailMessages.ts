import path from 'path';
import fs from 'fs/promises';
import { ApiLogMessage } from '@configs/logs/logMessages';
import { EmailMessage, IMessageTypes, MessageType } from '@services/email/email-interfaces';

const messagesDirectoryPath = path.resolve(__dirname, '../email/messages');

const messageMap = new Map<string, EmailMessage>();

async function SetupEmailMessageFiles(): Promise<Map<string, EmailMessage>> {
  ApiLogMessage('[EMAIL_MESSAGE]', 'Setup lang files...');

  const files = await fs.readdir(messagesDirectoryPath);

  return files
    .filter((fileName: string) => fileName.endsWith('.ts'))
    .map((fileName: string) => require(`./messages/${fileName}`))
    .reduce((messageMap: Map<string, EmailMessage>, file: EmailMessage) => {
      messageMap.set(file.message_type, file);

      ApiLogMessage('[EMAIL_MESSAGE]',`${file.message_type} email message file was loaded`);

      return messageMap;
    }, messageMap);
}

/**
 * Retrieves a message object based on the provided message type.
 *
 * @template T - A key from IMessageTypes that defines the type of message.
 * @param {T} messageType - The type of the message (inferred from IMessageTypes).
 * @returns {EmailMessage<MessageType<T>>} - The corresponding message object.
 * @throws {Error} If the message type is not found in the message map.
 */
function Message<T extends keyof IMessageTypes>(messageType: T): EmailMessage<MessageType<T>> {
  if (!messageMap.has(messageType)) {
    throw new Error('[MESSAGE_FILES] Message file not found');
  }
  return messageMap.get(messageType)! as EmailMessage<MessageType<T>>;
}

function ResolveMessages<T>(resolver: (file: EmailMessage) => T): T[] {
  const files = Array.from(messageMap.values());
  return files.map(resolver);
}

export { SetupEmailMessageFiles, Message, ResolveMessages };
