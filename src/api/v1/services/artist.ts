import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import Artist, { ArtistDocument } from "../model/artist";

export async function createArtist(input: any) {
  return Artist.create(input);
}

export async function findArtist(
  query: FilterQuery<ArtistDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Artist.findOne(query, select, options);
}

export async function findAndUpdateArtist(
  query: FilterQuery<ArtistDocument>,
  update: UpdateQuery<ArtistDocument>,
  options: QueryOptions
) {
  return Artist.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<ArtistDocument>) {
  return Artist.deleteOne(query);
}

export async function aggregateArtist(operators: Object[]) {
  return Artist.aggregate(operators);
}
