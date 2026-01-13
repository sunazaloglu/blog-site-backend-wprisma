import db from "../config/database.js";

type PostStatus = "published" | "draft" | "all";
type ShowDeleted = "true" | "false" | "onlyDeleted";

type PostFilters = {
  category?: number;
  status?: PostStatus;
  showDeleted?: ShowDeleted;
};

export const getAllPosts = async (filters: PostFilters) => {
  const q = db("posts").select(
    "id",
    "category_id",
    "title",
    "content",
    "created_at",
    "published_at",
    "deleted_at"
  );

  // category filter
  if (filters.category !== undefined) {
    q.where("category_id", filters.category);
  }

  // status filter
  if (filters.status === "published") {
    q.whereNotNull("published_at");
  } else if (filters.status === "draft") {
    q.whereNull("published_at");
  }
  // all, no filter

  // showDeleted filter
  if (filters.showDeleted === "true") {
    // hepsi, no filter
  } else if (filters.showDeleted === "onlyDeleted") {
    q.whereNotNull("deleted_at");
  } else {
    // default: false
    q.whereNull("deleted_at");
  }

  return q;
};

export const createPost = async (data: object) => {
  return db("posts").insert(data).returning("*");
};

export const updatePost = async (id: number, data: object) => {
  return db("posts")
    .where({ id, deleted_at: null })
    .update(data)
    .returning("*");
};

export const deletePost = async (id: number) => {
  return db("posts")
    .where({ id, deleted_at: null })
    .update({ deleted_at: new Date() })
    .returning("*");
};

export const getPostById = async (id: number) => {
  return db("posts").where({ id, deleted_at: null }).first();
};
