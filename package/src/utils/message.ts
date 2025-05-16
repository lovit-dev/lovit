// --------------------------------------------------------------------------
// Lovit utils/message.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

//
// Constants
//

const MESSAGE_TEMPLATES = {
  missing: `Missing required {0}.`,
  invalidType: `Invalid type for {0}. Expected {1}.`,
  invalidUsage: `Invalid usage: {0}.`,
  incorrect: `Incorrect {0}.`
} as const;

//
// Types
//

type TemplateFormatter = (placeholderValue: string) => string;
type InvalidTypeFormatter = (placeholderValue: string, expectedType: string) => string;

export type MessageType = 'Error' | 'Warning' | 'Info';

export type MessageFormatters = {
  [K in keyof typeof MESSAGE_TEMPLATES]: K extends 'invalidType' ? InvalidTypeFormatter : TemplateFormatter;
};

//
// Private
//

const MessageCompiler = {
  format<T extends keyof typeof MESSAGE_TEMPLATES>(template: (typeof MESSAGE_TEMPLATES)[T]): MessageFormatters[T] {
    return (...args: string[]) => template.replaceAll(/{(\d+)}/g, (_, i: string) => args[+i]);
  },

  generateFormatters(templates: typeof MESSAGE_TEMPLATES) {
    return Object.fromEntries(
      Object.entries(templates).map(([key, template]) => [key, this.format(template)])
    ) as MessageFormatters;
  }
} as const;

//
// Public
//

const Message = MessageCompiler.generateFormatters(MESSAGE_TEMPLATES);

export default Message;
