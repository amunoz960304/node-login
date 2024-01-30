import { Request } from 'express';
import { IUser } from '@/models/User';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    MONGO_URL: string;
    JWT_SECRET: string;
  }
}

declare module 'mongoose' {
  interface ConnectOptions {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
  }
}

export interface ICustomRequest extends Request {
  user?: IUser | null 
} 