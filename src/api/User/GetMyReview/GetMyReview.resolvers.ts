import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyReviewResponse } from "../../../types/graph";
import Review from "../../../entities/Review";
const winston = require("../../../config/winston");

// 유저 권한 - 리뷰 작성 이력 가져오기
const resolvers: Resolvers = {
  Query: {
    GetMyReview: privateResolver(
      async (_res, _args, { req }): Promise<GetMyReviewResponse> => {
        const { user } = req;

        try {
          const review = await Review.find({
            relations: ["product", "user"],
            where: { user },
            order: { createdAt: "DESC" },
          });

          if (!review) {
            return {
              ok: false,
              error: "review-not-found",
              review,
            };
          }
          return {
            ok: true,
            error: null,
            review,
          };
        } catch (e) {
          winston.info("Get-MyReview : " + e.message);
          return {
            ok: false,
            error: e.message,
            review: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
