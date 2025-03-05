import express from 'express';
import { infocontroller } from '../../controllers/index.js';
const app = express();
const router= express.Router();
router.get('/info',infocontroller.info);
export default router;