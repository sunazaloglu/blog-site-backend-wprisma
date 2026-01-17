import { Router } from "express";
import {
  createItem,
  deleteItem,
  itemDetails,
  listItems,
  updateItem,
} from "../controllers/tagController";

const router = Router();

router.get("/", listItems);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
router.get("/:id", itemDetails);

export default router;
