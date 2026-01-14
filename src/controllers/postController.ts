import { type Request, type Response } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../models/postModel.js";
import { getCategoryById } from "../models/categoryModel.js";
import { POST_STATUS, SHOW_DELETED } from "../utils/constants.js";

export const getAllPostsController = async (req: Request, res: Response) => {
  try {
    const filters: {
      category?: number;
      status?: keyof typeof POST_STATUS;
      showDeleted?: keyof typeof SHOW_DELETED;
    } = {};

    // category
    if (req.query.category !== undefined) {
      const category = Number(req.query.category);
      if (!Number.isNaN(category)) {
        filters.category = category;
      }
    }

    // status
    if (req.query.status !== undefined) {
      const status = req.query.status.toString();
      if (
        status === POST_STATUS.PUBLISHED ||
        status === POST_STATUS.DRAFT ||
        status === POST_STATUS.ALL
      ) {
        filters.status = status as keyof typeof POST_STATUS;
      }
    }

    // showDeleted
    if (req.query.showDeleted !== undefined) {
      const showDeleted = req.query.showDeleted.toString();
      if (
        showDeleted === SHOW_DELETED.TRUE ||
        showDeleted === SHOW_DELETED.FALSE ||
        showDeleted === SHOW_DELETED.ONLY_DELETED
      ) {
        filters.showDeleted = showDeleted as keyof typeof SHOW_DELETED;
      }
    }
    const items = await getAllPosts(filters);
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createPostController = async (req: Request, res: Response) => {
  try {
    const { category_id, title, content } = req.body;

    if (category_id === undefined) {
      return res.status(400).json({ message: "category_id is required" });
    }
    const categoryId = Number(category_id);
    if (Number.isNaN(categoryId)) {
      return res.status(400).json({ message: "category_id must be a number" });
    }

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "title and content are required" });
    }

    const category = await getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const post = await createPost({
      category_id: categoryId,
      title,
      content,
    });

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedItem = await updatePost(Number(id), req.body);
    if (!updatedItem) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(updatedItem);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePostController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await deletePost(Number(id));
    if (!deletedItem) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(deletedItem);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getPostByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await getPostById(Number(id));

    if (!item) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(item);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
