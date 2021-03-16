import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  EnrollCustomerServiceResponse,
  EnrollCustomerServiceMutationArgs,
} from "../../../types/graph";
import CustomerService from "../../../entities/CustomerService";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 유저 권한 - 1대1 문의 등록
const resolvers: Resolvers = {
  Mutation: {
    EnrollCustomerService: privateResolver(
      async (
        _res,
        args: EnrollCustomerServiceMutationArgs,
        { req }
      ): Promise<EnrollCustomerServiceResponse> => {
        const { user } = req;
        const notNullArgs = cleanNullArgs(args);
        const status = "처리중";

        try {
          await CustomerService.create({
            ...notNullArgs,
            user,
            status,
          }).save();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Enroll-CustomerService : "+e.message);
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
