import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  DeleteCustomerServiceMutationArgs,
  DeleteCustomerServiceResponse,
} from "../../../types/graph";
import CustomerService from "../../../entities/CustomerService";
const winston = require("../../../config/winston");

// 관리자 권한 - 1대1 문의 목록 지우기
const resolvers: Resolvers = {
  Mutation: {
    DeleteCustomerService: adminPrivateResolvers(
      async (
        _res,
        args: DeleteCustomerServiceMutationArgs,
        { req }
      ): Promise<DeleteCustomerServiceResponse> => {
        const { customerServiceId } = args;

        try {
          const customerservice = await CustomerService.findOne({
            id: customerServiceId!,
          });
          if (!customerservice) {
            return {
              ok: false,
              error: "not-found",
            };
          }

          await customerservice.softRemove();

          return {
            ok: true,
            error: null,
          };
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
