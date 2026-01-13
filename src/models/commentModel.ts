import { prisma } from "../config/database.js";
export const getAllComments = async (post?: number, comments?: string) => {
  let whereClause: any = {};
  if (post) {
    whereClause.post_id = post;
  }
  if (comments) {
    whereClause.content = comments;
  }
  return prisma.comment.findMany({
    where: whereClause,
    select: { id: true, commenter_name: true },
  });
};

export const createComment = async (data: object) => {
  return prisma.comment.create({ data: data as any });
};

export const updateComment = async (id: number, data: object) => {
  return prisma.comment.update({ where: { id }, data: data as any });
};

export const deleteComment = async (id: number) => {
  return prisma.comment.delete({ where: { id } });
};

export const getCommentById = async (id: number) => {
  return prisma.comment.findFirst({ where: { id } });
};
