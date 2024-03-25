export const extractAggregrationData = (
  aggregateData: Array<{
    analytics: Array<{
      totalDocuments: number;
      totalPages: number;
    }>;
    data: Array<Record<string, any>>;
  }>,
) => {
  return {
    analytics: {
      totalPages: aggregateData[0].analytics[0]?.totalPages,
      totalDocuments: aggregateData[0].analytics[0]?.totalDocuments,
    },
    data: aggregateData[0].data,
  };
};
