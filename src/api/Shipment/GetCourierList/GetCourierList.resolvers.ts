import { Resolvers } from "../../../types/resolvers";
import { GetCourierListResponse } from "../../../types/graph";
import Courier from "../../../entities/Courier";
const winston = require("../../../config/winston");

// 택배 업체 리스트 가져오기
const resolvers: Resolvers = {
  Query: {
    GetCourierList: async (
      _res,
      _arg,
      { req }
    ): Promise<GetCourierListResponse> => {
      try {
        const courier = await Courier.find({
          order: { id: "ASC" },
        });

        return {
          ok: true,
          error: null,
          courier,
        };
      } catch (e) {
        winston.info("Get-CourierList : "+e.message);
        return {
          ok: false,
          error: e.message,
          courier: null,
        };
      }
    },
  },
};

export default resolvers;
