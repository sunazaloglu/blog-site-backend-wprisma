import { prisma } from "../config/database.js";
import { SHOW_DELETED, POST_STATUS } from "../utils/constants.js";

type PostFilters = {
  category?: number;
  status?: string;
  showDeleted?: string;
};
export const getAllPosts = async (filters: PostFilters = {}) => {
  const whereClause: any = {};

  if (filters.showDeleted === SHOW_DELETED.TRUE) {
  } else if (filters.showDeleted === SHOW_DELETED.ONLY_DELETED) {
    whereClause.deleted_at = { not: null };
  } else {
    whereClause.deleted_at = null;
  }
  if (filters.category !== undefined) {
    whereClause.category_id = filters.category;
  }
  if (filters.status === POST_STATUS.PUBLISHED) {
    whereClause.published_at = { not: null };
  } else if (filters.status === POST_STATUS.DRAFT) {
    whereClause.published_at = null;
  }

  return prisma.post.findMany({
    where: whereClause,
    select: { id: true, title: true },
  });
};

export const createPost = async (data: object) => {
  return prisma.post.create({ data: data as any });
};

export const updatePost = async (id: number, data: object) => {
  const result = await prisma.post.updateMany({
    where: { id, deleted_at: null },
    data: data as any,
  });
  if (result.count === 0) {
    return null;
  }

  return prisma.post.findFirst({ where: { id, deleted_at: null } });
};

export const deletePost = async (id: number) => {
  const existing = await prisma.post.findFirst({
    where: { id, deleted_at: null },
  });

  if (!existing) {
    return null;
  }

  await prisma.post.update({
    where: { id },
    data: { deleted_at: new Date() },
  });

  return existing;
};
export const getPostById = async (id: number) => {
  return prisma.post.findFirst({ where: { id, deleted_at: null } });
};
