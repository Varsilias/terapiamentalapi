import mongoose from "mongoose";

export const pipeline = <T>({
  Model,
  stages,
  perPage,
  skip,
}: {
  Model: mongoose.Model<T>;
  stages: Array<any>;
  perPage: number;
  skip: number;
}) => {
  return Model.aggregate([
    {
      $facet: {
        analytics: [
          ...stages,
          {
            $group: {
              _id: null,
              totalDocuments: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              totalDocuments: 1,
              totalPages: {
                $ceil: {
                  $divide: ["$totalDocuments", perPage],
                },
              },
            },
          },
        ],
        data: [...stages, { $sort: { _id: -1 } }, { $skip: skip }, { $limit: perPage }],
      },
    },
  ]);
};
