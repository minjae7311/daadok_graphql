import Product from "../../../entities/Product";
import Enquiry from "../../../entities/Enquiry";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  EnrollEnquiryMutationArgs,
  EnrollEnquiryResponse,
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 유저가 상품 문의 등록 (공개.비공개)
const resolvers: Resolvers = {
  Mutation: {
    EnrollEnquiry: privateResolver(
      async (
        _,
        args: EnrollEnquiryMutationArgs,
        { req }
      ): Promise<EnrollEnquiryResponse> => {
        const { user } = req;
        const notNullArgs = cleanNullArgs(args);

        try {
          // product detail && individual enquiry
          const product = await Product.findOne({ id: args.productId });

          if (!product) {
            return {
              ok: false,
              error: "product-not-found",
            };
          }

          if (
            args.content !== "내용을 입력해주세요" &&
            args.title !== "질문 유형을 선택해주세요"
          ) {
            const enrollEnquiryResult = await Enquiry.create({
              ...notNullArgs,
              user,
              product,
            }).save();

            if (enrollEnquiryResult) {
              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: "failed-to-enroll-enquiry",
              };
            }
          } else {
            return {
              ok: false,
              error: "failed-to-enroll-content",
            };
          }
        } catch (e) {
          winston.info("Enroll-Enquiry : "+e.message);
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
