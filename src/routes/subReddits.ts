import {Router} from 'express';
import { createSubReddit } from '../controllers/subReddits';
import auth from '../middleware/auth';

const router = Router();

router.post('/', auth,createSubReddit);

export default router;