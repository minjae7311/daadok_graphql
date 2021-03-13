import { Resolvers } from "../../../types/resolvers";
import Interest from "../../../entities/Interest";
import { GetAllInterestResponse } from "../../../types/graph";
const winston = require("../../../config/winston");

// 전체 관심사 가져오기
const resolvers: Resolvers = {
  Query: {
    GetAllInterest: async (_res, _args, _): Promise<GetAllInterestResponse> => {
      try {
        const interest = await Interest.find();

        return {
          ok: true,
          error: null,
          interest,
        };
      } catch (e) {
        winston.info("Get-AllInterest : "+e.message);
        return {
          ok: false,
          error: e.message,
          interest: null,
        };
      }
    },
  },
};

export default resolvers;
