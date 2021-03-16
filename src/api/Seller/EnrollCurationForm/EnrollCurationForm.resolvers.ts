import { Resolvers } from "../../../types/resolvers";
import {
  EnrollCurationFormMutationArgs,
  EnrollCurationFormResponse,
} from "../../../types/graph";
import CurationForm from "../../../entities/CurationForm";
import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 판매가 권한 - 큐레이션 질문 사항 등록
const resolvers: Resolvers = {
  Mutation: {
    EnrollCurationForm: sellerPrivateResolvers(
      async (
        _res,
        args: EnrollCurationFormMutationArgs,
        { req }
      ): Promise<EnrollCurationFormResponse> => {
        const { seller } = req;
        const notNullArgs = cleanNullArgs(args);

        try {
          await CurationForm.create({
            ...notNullArgs,
            seller,
          }).save();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Enroll-CurationForm : "+e.message);
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
