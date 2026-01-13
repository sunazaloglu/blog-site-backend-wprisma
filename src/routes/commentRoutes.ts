import { Router } from "express";
import {
  createCommentController,
  deleteCommentController,
  getAllCommentsController,
  getCommentByIdController,
  updateCommentController,
} from "../controllers/commentController.js";

const router = Router();

router.get("/", getAllCommentsController);
router.post("/", createCommentController);
router.put("/:id", updateCommentController);
router.delete("/:id", deleteCommentController);
router.get("/:id", getCommentByIdController);

export default router;
