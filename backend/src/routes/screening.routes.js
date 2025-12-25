import express from "express";
import {
  getAllScreenings,
  getScreeningById,
  createScreening,
} from "../controllers/screening.controller.js";

const router = express.Router();

router.get('/', getAllScreenings);
router.get('/:id', getScreeningById);
router.post('/',createScreening );

export default router;
