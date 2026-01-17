import { type Request, type Response } from "express";
import { getPostById } from "../models/postModel.js";
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment,
} from "../models/commentModel.js";
import { Prisma } from "../generated/prisma";

export const getAllCommentsController = async (req: Request, res: Response) => {
  try {
    const filters: { post?: number; commenter?: string } = {};

    if (req.query.post !== undefined) {
      const post = Number(req.query.post);
      if (!Number.isNaN(post)) filters.post = post;
    }

    if (req.query.commenter !== undefined) {
      const commenter = req.query.commenter.toString().trim();
      if (commenter) filters.commenter = commenter;
    }

    const items = await getAllComments(filters.post, filters.commenter);
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createCommentController = async (req: Request, res: Response) => {
  try {
    const { post_id, content, commenter_name } = req.body;

    // zorunlu alanlar
    if (!post_id) {
      return res.status(400).json({ message: "post_id is required" });
    }

    if (!content || !commenter_name) {
      return res
        .status(400)
        .json({ message: "content and commenter_name are required" });
    }

    // post var mı
    const post = await getPostById(Number(post_id));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // create
    const newItem = await createComment({
      post_id,
      content,
      commenter_name,
    });

    return res.status(201).json(newItem);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCommentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }
    const updatedItem = await updateComment(Number(id), req.body);

    if (!updatedItem) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Internal server error" });
  }
};

export const deleteCommentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await deleteComment(Number(id));
    if (!deletedItem) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    return res.status(200).json(deletedItem);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Comment not found" });
      }
    }
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getCommentByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await getCommentById(Number(id));

    if (!item) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res.status(200).json(item);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
