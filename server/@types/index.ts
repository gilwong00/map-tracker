import { Request } from 'express';
import { UserDocument } from '../schema/user';

export interface AuthRequest extends Request {
  user?: UserDocument;
}
