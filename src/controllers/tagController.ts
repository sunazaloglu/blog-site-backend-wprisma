import { type Request, type Response } from "express";
import {
  createTags,
  deleteTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../models/tagModel";

export const createTagController = async (req: Request, res: Response) => {
  // Controller logic to create a tag
  try {
    const { name } = req.body;
    const item = await createTags(name);
    return res.status(201).json(item);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const listItems = async (req: Request, res: Response) => {
  try {
    const items = await getAllTags();
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const itemDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await getTagById(Number(id));
    if (!item) {
      return res.status(404).json({ message: "Tag not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedItem = await updateTag(Number(id), name);
    if (!updatedItem) {
      return res.status(404).json({ message: "Tag not found" });
    }
    return res.status(200).json(updatedItem);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await deleteTag(Number(id));
    if (!deletedItem) {
      return res.status(404).json({ message: "Tag not found" });
    }
    return res.status(204).json(deletedItem);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
