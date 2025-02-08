import { Router } from 'express';
import { getPosts, getPostById, createPost, updatePost, deletePost, getPostByAuthor } from '../controllers/PostController';
import { authenticate } from '../middlewares/Authenticate';
import { canExecuteAction } from '../middlewares/Permissions';

const router = Router();

router.get('/my-post', authenticate, getPostByAuthor);

router.get('/', getPosts);
router.get('/:id', getPostById);

router.post('/', authenticate, createPost);
router.put('/:id', authenticate, canExecuteAction, updatePost);
router.delete('/:id', authenticate, canExecuteAction, deletePost);

export default router;
