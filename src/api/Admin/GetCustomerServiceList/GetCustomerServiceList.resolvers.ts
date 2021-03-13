import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetCustomerServiceListQueryArgs,
  GetCustomerServiceListResponse,
} from "../../../types/graph";
import CustomerService from "../../../entities/CustomerService";
const winston = require("../../../config/winston");

// 관리자 권한 - 고객 문의 리스트 page 별로 가져오기
const resolvers: Resolvers = {
  Query: {
    GetCustomerServiceList: adminPrivateResolvers(
      async (
        _res,
        args: GetCustomerServiceListQueryArgs,
        { req }
      ): Promise<GetCustomerServiceListResponse> => {
        const { page } = args;

        try {
          const customerService = await CustomerService.find({
            order: { id: "ASC" },
            skip: page,
            take: 10,
          });

          return {
            ok: true,
            error: null,
            customerService,
          };
        } catch (e) {
          winston.info(e.message);
          return {
            ok: false,
            error: e.message,
            customerService: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
