import db from "../config/database.js";
type CommentFilters = {
  post?: number;
  commenter?: string;
};

export const getAllComments = async (filters: CommentFilters) => {
  const q = db("comments").select(
    "id",
    "post_id",
    "content",
    "commenter_name",
    "created_at"
  );

  if (filters.post !== undefined) {
    q.where("post_id", filters.post);
  }

  if (filters.commenter) {
    // PostgreSQL case-insensitive
    q.whereILike("commenter_name", `%${filters.commenter}%`);
  }

  return q;
};

export const createComment = async (data: object) => {
  return db("comments").insert(data).returning("*");
};

export const updateComment = async (id: number, data: object) => {
  return db("comments").where({ id }).update(data).returning("*");
};

export const deleteComment = async (id: number) => {
  return db("comments").where({ id }).delete().returning("*");
};

export const getCommentById = async (id: number) => {
  return db("comments").where({ id }).first();
};
