import type { ConnectorMetadata } from '@logto/connector-kit';

export const endpoint = 'https://gateway.seven.io/api/sms';

export const defaultMetadata: ConnectorMetadata = {
  configTemplate: './docs/config-template.json',
  description: {
    'de-DE': 'Seven versendet SMS.',
    en: 'Seven provides SMS messaging.',
  },
  id: 'seven-short-message-service',
  logo: './logo.svg',
  logoDark: null,
  name: {
    'de-DE': 'Seven SMS-Service',
    en: 'Seven SMS Service',
  },
  platform: null,
  readme: './README.md',
  target: 'seven-sms',
};
