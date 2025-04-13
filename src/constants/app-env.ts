import { AppEnvSchema } from '@/utils/schemas';

export const appEnv = AppEnvSchema.validateSync({
  ApiBaseUrl: import.meta.env.VITE_API_BASE_URL,
});
