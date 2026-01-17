import { Router } from "express";
import {
  addTagToPostController,
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostByIdController,
  removeTagFromPostController,
  updatePostController,
} from "../controllers/postController.js";

const router = Router();

router.get("/", getAllPostsController);
router.post("/", createPostController);
router.put("/:id", updatePostController);
router.delete("/:id", deletePostController);
router.get("/:id", getPostByIdController);

router.post("/:postId/tags", addTagToPostController);
router.delete("/:postId/tags", removeTagFromPostController);
export default router;
