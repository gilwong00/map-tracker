import { Router } from 'express';
import userRoutes from './user';
import trackRoutes from './track';

const router = Router();

router.use('/user', userRoutes);
router.use('/tracks', trackRoutes);

export default router;
