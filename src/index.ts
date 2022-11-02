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
import { assert } from '@silverhand/essentials';
import type { SmsParams } from 'sms77-client';
import Sms77Client from 'sms77-client';

import { defaultMetadata } from './constant';
import type { SevenSmsConfig } from './types';
import { sevenSmsConfigGuard } from './types';

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
        ? template.content.replace(/{{code}}/g, payload.code)
        : template.content;

    try {
      const client = new Sms77Client(apiKey, 'Logto');
      const smsParameters: SmsParams = {
        from,
        json: true,
        text,
        to,
      };

      return await client.sms(smsParameters);
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
