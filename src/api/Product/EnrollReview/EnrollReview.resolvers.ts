import Product from "../../../entities/Product";
import Review from "../../../entities/Review";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  EnrollReviewMutationArgs,
  EnrollReviewResponse,
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 유저가 상품에 대한 리뷰를 등록
const resolvers: Resolvers = {
  Mutation: {
    EnrollReview: privateResolver(
      async (
        _,
        args: EnrollReviewMutationArgs,
        { req }
      ): Promise<EnrollReviewResponse> => {
        const { user } = req;
        const { productId } = args;

        try {
          const product = await Product.findOne({ id: productId });

          if (!product) {
            return {
              ok: false,
              error: "invalid-product",
            };
          }
          
          const notNullArgs = cleanNullArgs(args);
          const enrollReviewResult = await Review.create({
            user,
            ...notNullArgs,
          }).save();

          if (enrollReviewResult) {
            const grade = await Product.findOne({ id: productId });
            const review = await Review.find({ where: { product: productId } });
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
              error: "failed-to-enroll-review",
            };
          }
        } catch (e) {
          winston.info("Enroll-Review : " + e.message);
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
