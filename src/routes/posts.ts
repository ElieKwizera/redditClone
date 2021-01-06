import {Router} from 'express';
import { createPost, getPosts, getPost, createComment} from '../controllers/posts';
import auth from '../middleware/auth';


const router = Router();

router.get('/', auth, getPosts);
router.get('/:identifier/:slug', auth, getPost);
router.post('/', auth , createPost);
router.post('/:identifier/:slug/comments', auth, createComment);

export default router;

