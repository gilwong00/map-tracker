import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthRequest } from '../@types';
import { User } from '../schema';
import { UserDocument } from '../schema/user';

interface DecodedToken {
  userId: string;
  exp: number;
}

const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '') ?? '';
    const decoded = verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    if (!authorization || !decoded) throw new Error('Unauthorized');

    const user = await User.findOne({ _id: decoded?.userId });
    req.user = user as UserDocument;

    return next();
  } catch (err) {
    return res.status(401).json('Unauthorized');
  }
};

export default requireAuth;
