import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateReviewResponse,
  UpdateReviewMutationArgs,
} from "../../../types/graph";
import Review from "../../../entities/Review";
import Product from "../../../entities/Product";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 유저 주소 등록 (주소 api 사용)
const resolvers: Resolvers = {
  Mutation: {
    UpdateReview: privateResolver(
      async (
        _res,
        args: UpdateReviewMutationArgs,
        { req }
      ): Promise<UpdateReviewResponse> => {
        const { reviewId, productId } = args;

        try {
          const existRev = await Review.findOne({ id: reviewId });

          if (existRev) {
            const inputArgs = Object.keys(cleanNullArgs(args));

            inputArgs.forEach((key) => {
              if (key !== "addressId") {
                existRev[key] = args[key];
              }
            });

            const enrollReviewResult = await existRev.save();

            if (enrollReviewResult) {
              const grade = await Product.findOne({ id: productId });
              const review = await Review.find({
                where: { product: productId },
              });
              const score = review.map((item) => {
                return item.score;
              });
              const average = (array) => {
                return (
                  array.reduce((sum: any, current: any) => sum + current, 0) /
                  array.length
                );
              };

              if (score.length !== 0) {
                grade!.grade = Number(average(score).toFixed(1));
                grade!.save();
              }

              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: "failed-to-update-review",
              };
            }
          } else {
            return {
              ok: false,
              error: "review-not-found",
            };
          }
        } catch (e) {
          winston.info("Enroll-Address : " + e.message);
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
