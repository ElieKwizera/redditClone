import { Router } from "express";
import {register, login, me, logout} from '../controllers/auth';
import auth from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me',auth, me);
router.get( '/logout',auth, logout);
    
export default router;
