import MandatoryInfo from "../../../entities/MandatoryInfo";
import { Resolvers } from "../../../types/resolvers";
import {
  EnrollMandantoryInfoMutationArgs,
  EnrollMandantoryInfoResponse,
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";
// import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
const winston = require("../../../config/winston");

// 판매자 권한 - 상품 등록
const resolvers: Resolvers = {
  Mutation: {
    EnrollMandantoryInfo: (
      async (
        _res,
        args: EnrollMandantoryInfoMutationArgs,
        { req }
      ): Promise<EnrollMandantoryInfoResponse> => {
        const notNullArgs = cleanNullArgs(args);

        try {
          const mandantoryInfo = await MandatoryInfo.create({
            ...notNullArgs,
          }).save();

          if (mandantoryInfo) {
            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "failed-to-enroll-mandantoryInfo",
            };
          }
        } catch (e) {
          winston.info("Enroll-MandantoryInfo : "+e.message);
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
