import { Resolvers } from "../../../types/resolvers";
import {
  UpdateMandantoryInfoMutationArgs,
  UpdateMandantoryInfoResponse,
} from "../../../types/graph";
// import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
import cleanNullArgs from "../../../utils/cleanNullArg";
import MandatoryInfo from "../../../entities/MandatoryInfo";
const winston = require("../../../config/winston");

// 판매자 권한 - 등록 상품 세부사항 수정
const resolvers: Resolvers = {
  Mutation: {
    UpdateMandantoryInfo: (
      async (
        _,
        args: UpdateMandantoryInfoMutationArgs,
        { req }
      ): Promise<UpdateMandantoryInfoResponse> => {

        try {
          const mandantoryInfo = await MandatoryInfo.findOne(
            { id: args.mandatoryId },
          );
          const inputArgs = Object.keys(cleanNullArgs(args));

          if (!mandantoryInfo) {
            return {
              ok: false,
              error: "product-not-found",
            };
          }

          if (mandantoryInfo) {
            inputArgs.forEach((key) => {
                mandantoryInfo[key] = args[key];
            });

            await mandantoryInfo.save();

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "seller-not-matched",
            };
          }
        } catch (e) {
          winston.info("Update-MandantoryInfo : "+e.message);
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
