import db from "../config/database.js";

type ShowDeleted = "true" | "false" | "onlyDeleted";

export const getAllCategories = async (showDeleted?: ShowDeleted) => {
  const query = db("categories").select(
    "id",
    "name",
    "created_at",
    "deleted_at"
  );

  if (showDeleted === "true") {
    // hepsi gelsin
  } else if (showDeleted === "onlyDeleted") {
    query.whereNotNull("deleted_at");
  } else {
    // default: false
    query.whereNull("deleted_at");
  }

  return query;
};
export const createCategory = async (name: string) => {
  return db("categories").insert({ name }).returning("*");
};

export const updateCategory = async (id: number, data: object) => {
  return db("categories")
    .where({ id, deleted_at: null })
    .update(data)
    .returning("*");
};

export const deleteCategory = async (id: number) => {
  return db("categories")
    .where({ id })
    .whereNull("deleted_at")
    .update({ deleted_at: new Date() })
    .returning("*");
};


export const getCategoryById = async (id: number) => {
  return db("categories").where({ id, deleted_at: null }).first();
};
