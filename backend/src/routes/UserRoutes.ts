import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, getUserByToken } from '../controllers/UserController';
import { authenticate } from '../middlewares/Authenticate';

const router = Router();

// Authenticated routes
router.get('/me', authenticate, getUserByToken);

// Public routes
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

// Authenticated routes for specific users
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

export default router;
