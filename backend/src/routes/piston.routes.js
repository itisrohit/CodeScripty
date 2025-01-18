import { Router } from 'express';
import { runCode, getLatestRuntimes } from '../controllers/piston.controller.js';
// import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/run', runCode);
router.get('/latest-runtimes', getLatestRuntimes);

export default router;