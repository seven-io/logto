import { z } from 'zod';

/**
 * @doc https://www.seven.io/en/docs/gateway/http-api/sms-dispatch/
 *
 * @doc https://en.wikipedia.org/wiki/E.164
 */

/**
 * UsageType here is used to specify the use case of the template, can be either
 * 'Register', 'SignIn', 'ForgotPassword' or 'Test'.
 */
const templateGuard = z.object({
  content: z.string(),
  usageType: z.string(),
});

export const sevenSmsConfigGuard = z.object({
  apiKey: z.string(),
  from: z.string().optional(),
  templates: z.array(templateGuard),
});

export type SevenSmsConfig = z.infer<typeof sevenSmsConfigGuard>;
