declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_URI: string;
    JWT_SECRET: string;
    NODE_ENV: string;
    PORT: number;
  }
}
