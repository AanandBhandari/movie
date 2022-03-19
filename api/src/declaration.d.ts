declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      MONGO_URI: string;
      NODE_ENV: "development" | "production";
      ENVIRONMENT: string;
      SITE: string;
      PORT: string;
    }
  }
}

declare module "express-async-errors";
