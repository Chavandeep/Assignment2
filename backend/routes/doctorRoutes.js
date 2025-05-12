import express from 'express';
import { addDoctor, getDoctorsWithFilters } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/add', addDoctor);
router.get('/list', getDoctorsWithFilters);

export default router;
