import { Router, Request, Response } from 'express';
import { hash, verify } from 'argon2';
import { User } from '../schema';
import { UserDocument } from '../schema/user';
import { logger } from '../utils';
import jwt from 'jsonwebtoken';
import requireAuth from '../middleware/requireAuth';

const router = Router();

router.post(
  '/signup',
  async (
    req: Request,
    res: Response
  ): Promise<Response<Partial<UserDocument> | string>> => {
    try {
      logger.log('info', `[User Signup]: ${JSON.stringify(req.body)}`);
      const { firstName, lastName, email, password } = req.body;
      const hashPassword: string = await hash(password);
      const newUser = await new User({
        firstName,
        lastName,
        email,
        password: hashPassword
      }).save();

      return res.status(200).json({
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      });
    } catch (err) {
      logger.log('error', `[User Signup]: ${err.message}`);
      return res.status(500).json(err.message);
    }
  }
);

router.post(
  '/login',
  async (
    req: Request,
    res: Response
  ): Promise<Response<Partial<UserDocument> | string>> => {
    try {
      logger.log('info', `[User Login]: ${JSON.stringify(req.body)}`);
      const { email, password } = req.body;
      const userRecord = await User.findOne({ email });

      if (userRecord) {
        const isPasswordCorrect = await verify(userRecord.password, password);

        if (!isPasswordCorrect)
          return res.status(400).json('Password does not match');

        const token = jwt.sign(
          { userId: userRecord._id },
          process.env.JWT_SECRET as string,
          {
            expiresIn: 1 * 24 * 60 * 60 * 1000 // 1 day in milliseconds
          }
        );

        return res.status(200).json({
          token,
          firstName: userRecord.firstName,
          lastName: userRecord.lastName,
          email: userRecord.email,
          id: userRecord._id
        });
      } else {
        return res.status(404).json(`Could not find user with email ${email}`);
      }
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
);

router.get('/', requireAuth, (_, res: Response) => {
  return res.status(200).json('Access');
});

export default router;
