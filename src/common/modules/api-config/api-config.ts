import { registerAs } from '@nestjs/config';

export default registerAs('apiConfig', () => {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    apiKey: process.env.API_KEY,
    database: {
      connection: process.env.DATABASE_CONNECTION,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      name: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      pass: process.env.DATABASE_PASS,
    },
    hash: {
      salt: parseInt(process.env.HASH_SALT, 10) || 10,
    },
    auth: {
      secret: process.env.AUTH_SECRET,
      expire: process.env.AUTH_EXPIRE,
    },
  };
});
