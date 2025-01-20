import { Router } from 'express';
import { createFile, updateFile } from '../controllers/file.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/create', verifyJWT, createFile);
router.put('/update', verifyJWT, updateFile);

export default router;