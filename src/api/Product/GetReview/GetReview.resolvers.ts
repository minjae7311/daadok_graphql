import { Resolvers } from "../../../types/resolvers";
import Review from "../../../entities/Review";
import { GetReviewResponse, GetReviewQueryArgs } from "../../../types/graph";
const winston = require("../../../config/winston");

// 해당 상품의 리뷰를 가져오기
const resolvers: Resolvers = {
  Query: {
    GetReview: async (
      _res,
      args: GetReviewQueryArgs,
      { req }
    ): Promise<GetReviewResponse> => {
      const { productId } = args;

      try {
        const review = await Review.find({
          where: [{ product: productId }],
          relations: ["product", "user"],
        });

        return {
          ok: true,
          error: null,
          review,
        };
      } catch (e) {
        winston.info("Get-Review : "+e.message);
        return {
          ok: false,
          error: e.message,
          review: null,
        };
      }
    },
  },
};

export default resolvers;
