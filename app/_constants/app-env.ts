import { AppEnvSchema } from '@/_utils/schemas';

export const appEnv = AppEnvSchema.validateSync({
  ApiUrl: process.env.NEXT_PUBLIC_API_URL,
});
