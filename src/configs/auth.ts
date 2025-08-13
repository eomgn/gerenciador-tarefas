import { env } from "@/env";

export const authConfig = {
  jwt: {
    secret: env.JWT_SECRETS,
    expiresIn: "1d",
  },
};
