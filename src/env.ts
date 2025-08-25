import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string(),
  JWT_SECRETS: zod.string(),
  PORT: zod.coerce.number().default(3000), // '.coerce' é para transformar em number caso seja passado string
});

export const env = envSchema.parse(process.env);
