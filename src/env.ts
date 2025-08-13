import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string(),
  JWT_SECRETS: zod.string(),
});

export const env = envSchema.parse(process.env);
