import express from 'express';
import { createAeroplane } from '../../controllers/index.js';

const app = express();
const router=express.Router();

router.post('/',createAeroplane);
export default router;