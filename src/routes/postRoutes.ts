import { Router } from "express";
import { createPostController, deletePostController, getAllPostsController, getPostByIdController, updatePostController } from "../controllers/postController.js";

const router = Router();

router.get("/", getAllPostsController);
router.post("/", createPostController);
router.put("/:id", updatePostController);
router.delete("/:id", deletePostController);
router.get("/:id", getPostByIdController);

export default router;
