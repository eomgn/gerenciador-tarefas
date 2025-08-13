export const authConfig = {
  jwt: {
    secrets: process.env.JWT_SECRET,
    expiresIn: "1d",
  },
};
