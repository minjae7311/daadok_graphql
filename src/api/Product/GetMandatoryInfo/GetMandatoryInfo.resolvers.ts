import { Resolvers } from "../../../types/resolvers";
import MandatoryInfo from "../../../entities/MandatoryInfo";
import {
  GetMandatoryInfoResponse,
  GetMandatoryInfoQueryArgs,
} from "../../../types/graph";
const winston = require("../../../config/winston");

// 카테고리 및 서브 카테고리 목록 가져오기
const resolvers: Resolvers = {
  Query: {
    GetMandatoryInfo: async (
      _res,
      args: GetMandatoryInfoQueryArgs,
      _
    ): Promise<GetMandatoryInfoResponse> => {
      const { category } = args;

      try {
        const mandatoryInfo = await MandatoryInfo.findOne({
          where: { category: category },
        });

        if (!mandatoryInfo) {
          return {
            ok: false,
            error: "mandatory-not-found",
            mandatoryInfo: null,
          };
        }

        return {
          ok: true,
          error: null,
          mandatoryInfo,
        };
      } catch (e) {
        winston.info("Get-Mandatory : "+e.message);
        return {
          ok: false,
          error: e.message,
          mandatoryInfo: null,
        };
      }
    },
  },
};

export default resolvers;
