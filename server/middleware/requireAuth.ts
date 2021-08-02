import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '') ?? '';
    const decoded: any = verify(token, process.env.JWT_SECRET as string);

    if (!authorization || !decoded) throw new Error('Unauthorized');

    return next();
  } catch (err) {
    return res.status(401).json('Unauthorized');
  }
};

export default requireAuth;
