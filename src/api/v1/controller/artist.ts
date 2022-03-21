import axios from "axios";
import { query, Request, Response } from "express";
import checkError from "../helpers/checkErrors";
import CustomError from "../helpers/customError";

import LocalityName from "../helpers/localityName";
import Location from "../interfaces/location";
import { PostDocument } from "../model/post";
import { createLike, findAndDeleteLike } from "../services/like";
import { aggregatePost, createPost, findPost } from "../services/post";

export async function addPostHandler(req: Request, res: Response) {
  try {
    let post: PostDocument;
    if (req.body.point) {
      const { point }: { point: Location } = req.body;

      let locality = LocalityName(
        await axios.get(
          `${process.env.GOOGLELOCALITYURI}&latlng=${point.latitude},${point.longitude}`
        )
      );

      post = await createPost({
        ...req.body,
        // city: mainCity.parentId ? mainCity.parentId : mainCity._id,
        state: locality,
        ownerId: req.number!,
        ownerName: req.user!.username,
        location: {
          type: "Point",
          coordinates: [point.longitude, point.latitude],
        },
      });
    } else {
      post = await createPost({
        ...req.body,
        ownerId: req.number!,
        ownerName: req.user!.username,
      });
    }

    res.send({
      _id: post?._id ?? "",
    });
  } catch (err) {
    checkError(err, res);
  }
}

export async function getInitialAuthDataHandler(req: Request, res: Response) {
  try {
    let posts: PostDocument[];

    const props = [
      {
        $lookup: {
          from: "likes",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$postId", "$$postId"] }],
                },
              },
            },
            { $project: { _id: 1, artistId: 1 } },
          ],
          as: "likes",
        },
      },
      {
        $addFields: {
          liked: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $setIntersection: ["$likes.artistId", [req.number!]],
                    },
                  },
                  0,
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      { $addFields: { count: { $size: "$likes" } } },
      {
        $project: {
          createdAt: 1,
          state: 1,
          distance: 1,
          ownerName: 1,
          ownerId: 1,
          imageUri: 1,
          caption: 1,
          count: 1,
          liked: 1,
        },
      },
    ];
    if (req.body.position) {
      const { position }: { position: Location } = req.body;

      posts = [
        ...(await aggregatePost([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [position.longitude, position.latitude],
              },

              distanceField: "distance",
              query: { location: { $exists: true } },
              key: "location",
              spherical: true,
            },
          },
          ...props,
          { $sort: { distance: 1 } },
        ])),
        ...(await aggregatePost([
          { $match: { location: { $exists: false } } },
          ...props,
          { $sort: { createdAt: -1 } },
        ])),
      ];
    } else {
      posts = await aggregatePost([...props]);
    }

    res.send(posts);
  } catch (err) {
    checkError(err, res);
  }
}

export async function getInitialUnAuthDataHandler(req: Request, res: Response) {
  try {
    let posts: PostDocument[];

    const props = [
      {
        $lookup: {
          from: "likes",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$postId", "$$postId"] }],
                },
              },
            },
            { $project: { _id: 1, artistId: 1 } },
          ],
          as: "likes",
        },
      },

      { $addFields: { count: { $size: "$likes" } } },
      {
        $project: {
          createdAt: 1,
          state: 1,
          distance: 1,
          ownerName: 1,
          ownerId: 1,
          imageUri: 1,
          caption: 1,
          count: 1,
        },
      },
    ];
    if (req.body.position) {
      const { position }: { position: Location } = req.body;

      posts = [
        ...(await aggregatePost([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [position.longitude, position.latitude],
              },

              distanceField: "distance",
              query: { location: { $exists: true } },
              key: "location",
              spherical: true,
            },
          },
          ...props,
          { $sort: { distance: 1 } },
        ])),
        ...(await aggregatePost([
          { $match: { location: { $exists: false } } },
          ...props,
          { $sort: { createdAt: -1 } },
        ])),
      ];
    } else {
      posts = await aggregatePost([...props]);
    }

    res.send(posts);
  } catch (err) {
    checkError(err, res);
  }
}

export async function addLikeHandler(req: Request, res: Response) {
  try {
    const post = await findPost({ _id: req.params.postId });
    if (!post) {
      throw new CustomError("Bad Request", 404, "No Such Post Found");
    }
    await createLike({
      postId: req.params.postId,
      ownerId: post.ownerId,
      artistName: req.user!.username,
      artistId: req.number!,
    });

    res.send({ message: "Like Added" });
  } catch (err) {
    checkError(err, res);
  }
}

export async function removeLikeHandler(req: Request, res: Response) {
  try {
    await findAndDeleteLike({
      postId: req.params.postId,
      artistId: req.number!,
    });

    res.send({ message: "Post Deleted" });
  } catch (err) {
    checkError(err, res);
  }
}
