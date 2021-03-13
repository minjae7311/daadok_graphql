import CustomerService from "../../../entities/CustomerService";
import { Resolvers } from "../../../types/resolvers";
import {
  AnswerCustomerServiceMutationArgs,
  AnswerCustomerServiceResponse,
} from "../../../types/graph";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
const winston = require("../../../config/winston");

// 관리자 권한 - 고객 문의 답변
const resolvers: Resolvers = {
  Mutation: {
    AnswerCustomerService: adminPrivateResolvers(
      async (
        _,
        args: AnswerCustomerServiceMutationArgs,
        { req }
      ): Promise<AnswerCustomerServiceResponse> => {
        const { customerServiceId, answer } = args;

        try {
          const csAnswer = await CustomerService.findOne({
            id: customerServiceId,
          });

          if (csAnswer) {
            csAnswer.answer = answer;
            csAnswer.status = "답변완료";
            await csAnswer.save();

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "cs-not-found",
            };
          }
        } catch (e) {
          winston.info(e.message);
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
