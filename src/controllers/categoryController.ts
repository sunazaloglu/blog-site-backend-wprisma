import { type Request, type Response } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../models/categoryModel.js";

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const showDeleted = req.query.showDeleted?.toString() as
      | "true"
      | "false"
      | "onlyDeleted"
      | undefined;

    const items = await getAllCategories(showDeleted as string);
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const item = await createCategory(name);
    res.status(201).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await updateCategory(Number(id), req.body);
    if (!item) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await deleteCategory(Number(id));

    if (!deletedItem) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(deletedItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const item = await getCategoryById(Number(id));

    if (!item) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(item);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
