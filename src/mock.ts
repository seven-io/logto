import type { SevenSmsConfig } from './types.js';

const mockedApiKey = 'api-key';
const mockedFrom = 'from-messaging-service-sid';

export const mockedConfig: SevenSmsConfig = {
  apiKey: mockedApiKey,
  from: mockedFrom,
  templates: [
    {
      content: 'This is for testing purposes only. Your passcode is {{code}}.',
      usageType: 'Test',
    },
  ],
};
