import { Router, Response } from 'express';
import { Track } from '../schema';
import { AuthRequest } from '../@types';
import { logger } from '../utils';
import requireAuth from '../middleware/requireAuth';

const router = Router();

router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const tracks = await Track.find({ userId: req?.user?._id });

    return res.status(200).json(tracks);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    logger.log('info', `[Track Create]: ${JSON.stringify(req.body)}`);

    const { name, locations } = req.body;

    if (!name || !locations)
      return res.status(422).json('You must provide a name and locations');

    const newTrack = await new Track({
      name,
      locations,
      userId: req?.user?._id
    }).save();

    return res.status(200).json(newTrack);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

export default router;
