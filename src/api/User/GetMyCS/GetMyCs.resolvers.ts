import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyCSResponse } from "../../../types/graph";
import CustomerService from "../../../entities/CustomerService";
const winston = require("../../../config/winston");

// 유저 권한 - 등록한 CS 가져오기
const resolvers: Resolvers = {
  Query: {
    GetMyCS: privateResolver(
      async (_res, _args, { req }): Promise<GetMyCSResponse> => {
        const { user } = req;

        try {
          const customerservice = await CustomerService.find({
            where: { user: user.id },
            order: { createdAt: "DESC" },
          });

          return {
            ok: true,
            error: null,
            customerservice,
          };
        } catch (e) {
          winston.info("Get-MyAddress : " + e.message);
          return {
            ok: false,
            error: e.message,
            customerservice: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
