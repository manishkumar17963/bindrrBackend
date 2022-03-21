import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Post, { PostDocument } from "../model/post";

export async function createPost(input: any) {
  return Post.create(input);
}

export async function findPost(
  query: FilterQuery<PostDocument>,
  select: { [key: string]: number | string } = {},
  options: QueryOptions = {}
) {
  return Post.findOne(query, select, options);
}

export async function findAllPost(
  query: FilterQuery<PostDocument>,
  select: { [key: string]: number | string } = {},
  options: QueryOptions = {}
) {
  return Post.find(query, select, options);
}

export async function findAndUpdatePost(
  query: FilterQuery<PostDocument>,
  update: UpdateQuery<PostDocument>,
  options: QueryOptions
) {
  return Post.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<PostDocument>) {
  return Post.deleteOne(query);
}

export async function aggregatePost(operators: Object[]) {
  return Post.aggregate(operators);
}
