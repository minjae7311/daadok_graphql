import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  DeleteMyReviewMutationArgs,
  DeleteMyReviewResponse,
} from "../../../types/graph";
import Review from "../../../entities/Review";
const winston = require("../../../config/winston");

// 유저 권한 - 작성했던 리뷰 제거
const resolvers: Resolvers = {
  Mutation: {
    DeleteMyReview: privateResolver(
      async (
        _res,
        args: DeleteMyReviewMutationArgs,
        { req }
      ): Promise<DeleteMyReviewResponse> => {
        const { reviewId } = args;

        try {
          const review = await Review.findOne({ id: reviewId });

          if (!review) {
            return {
              ok: false,
              error: "review-not-found",
            };
          }

          await review.softRemove();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Delete-MySearchWord : " + e.message);

          return {
            ok: false,
            error: e.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
