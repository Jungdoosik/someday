import { Router } from "express";
import * as ThoughtController from "../controllers/thought_controller";

const router = Router();

router.get("/", ThoughtController.getThoughts);
router.post("/saveThought", ThoughtController.createThought);
router.patch("/deleteThought/:id", ThoughtController.deleteThought);
router.get("/:id", ThoughtController.modifyThought);

export default router;
