import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import Like, { LikeDocument } from "../model/like";

export async function createLike(input: any) {
  return Like.create(input);
}

export async function findLike(
  query: FilterQuery<LikeDocument>,
  select: { [key: string]: number | string } = {},
  options: QueryOptions = {}
) {
  return Like.findOne(query, select, options);
}

export async function findAllLike(
  query: FilterQuery<LikeDocument>,
  select: { [key: string]: number | string } = {},
  options: QueryOptions = {}
) {
  return Like.find(query, select, options);
}

export async function findAndUpdateLike(
  query: FilterQuery<LikeDocument>,
  update: UpdateQuery<LikeDocument>,
  options: QueryOptions
) {
  return Like.findOneAndUpdate(query, update, options);
}

export async function deleteLike(query: FilterQuery<LikeDocument>) {
  return Like.deleteOne(query);
}

export async function findAndDeleteLike(query: FilterQuery<LikeDocument>) {
  return Like.findOneAndDelete(query);
}

export async function aggregateLike(operators: Object[]) {
  return Like.aggregate(operators);
}
