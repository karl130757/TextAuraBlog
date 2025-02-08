import { Router } from 'express';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import PostRoutes from './PostRoutes';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);
router.use('/posts', PostRoutes);

export default router;
