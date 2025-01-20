import { Router } from 'express';
import { createFolder } from '../controllers/folder.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/create', verifyJWT, createFolder);

export default router;