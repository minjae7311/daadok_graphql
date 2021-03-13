import Enquiry from "../../../entities/Enquiry";
import { Resolvers } from "../../../types/resolvers";
import {
  AnswerEnquiryMutationArgs,
  AnswerEnquiryResponse,
} from "../../../types/graph";
import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
const winston = require("../../../config/winston");

// 판매자 권한 - 등록한 상품에 대한 문의 답변 달기
const resolvers: Resolvers = {
  Mutation: {
    AnswerEnquiry: sellerPrivateResolvers(
      async (
        _,
        args: AnswerEnquiryMutationArgs,
        { req }
      ): Promise<AnswerEnquiryResponse> => {
        const { enquiryId, answer } = args;

        try {
          const enquiryAnswer = await Enquiry.findOne({ id: enquiryId });

          if (enquiryAnswer) {
            Object.keys(enquiryAnswer).forEach((key) => {
              if (key == "answer") enquiryAnswer[key] = answer;
            });
            await enquiryAnswer.save();

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "enquiry-not-found",
            };
          }
        } catch (e) {
          winston.info("Answer-Enquiry : "+e.message);
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
