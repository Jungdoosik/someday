import { Router } from "express";
import * as ThoughtController from "../controllers/thought_controller";

const router = Router();

router.get("/", ThoughtController.getThoughts);
router.post("/saveThought", ThoughtController.createThought);

export default router;
