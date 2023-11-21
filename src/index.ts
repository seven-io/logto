import type {
  GetConnectorConfig,
  SendMessageFunction,
  CreateConnector,
  SmsConnector,
} from '@logto/connector-kit';
import {
  ConnectorError,
  ConnectorErrorCodes,
  validateConfig,
  ConnectorType,
} from '@logto/connector-kit';
import SevenClient, { type SmsParams } from '@seven.io/api';
import { assert } from '@silverhand/essentials';

import { defaultMetadata } from './constant.js';
import { type SevenSmsConfig, sevenSmsConfigGuard } from './types.js';

const sendMessage =
  (getConfig: GetConnectorConfig): SendMessageFunction =>
  async (data, inputConfig) => {
    const { to, type, payload } = data;
    const config = inputConfig ?? (await getConfig(defaultMetadata.id));
    validateConfig<SevenSmsConfig>(config, sevenSmsConfigGuard);
    const { apiKey, from, templates } = config;
    const template = templates.find((template) => template.usageType === type);

    assert(
      template,
      new ConnectorError(
        ConnectorErrorCodes.TemplateNotFound,
        `Cannot find template for type: ${type}`
      )
    );

    const text =
      typeof payload.code === 'string'
        ? template.content.replaceAll('{{code}}', payload.code)
        : template.content;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
      const client: SevenClient.default = new SevenClient.Sms77Client(apiKey, 'Logto');
      const smsParameters: SmsParams = {
        from,
        json: true,
        text,
        to,
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
      return client.sms(smsParameters);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ConnectorError(ConnectorErrorCodes.General, error.message);
      }

      throw error;
    }
  };

const createSevenSmsConnector: CreateConnector<SmsConnector> = async ({ getConfig }) => {
  return {
    configGuard: sevenSmsConfigGuard,
    metadata: defaultMetadata,
    sendMessage: sendMessage(getConfig),
    type: ConnectorType.Sms,
  };
};

export default createSevenSmsConnector;
