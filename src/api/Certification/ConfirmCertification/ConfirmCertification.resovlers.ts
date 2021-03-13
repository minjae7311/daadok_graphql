import { Resolvers } from "../../../types/resolvers";
import {
  ConfirmCertificationResponse,
  ConfirmCertificationMutationArgs,
} from "../../../types/graph";
import { confirmCertification } from "../../../utils/functions.certification";
const winston = require("../../../config/winston");

// 핸드폰 인증 성공
const resolvers: Resolvers = {
  Mutation: {
    ConfirmCertification: async (
      _res,
      args: ConfirmCertificationMutationArgs,
      { req }
    ): Promise<ConfirmCertificationResponse> => {
      const { imp_uid, otp } = args;

      try {
        const result = await confirmCertification(imp_uid, otp);
        if (result.ok && result.response) {
          return {
            ok: true,
            error: null,
            response: result.response,
          };
        } else {
          return {
            ok: false,
            error: result.error,
            response: null,
          };
        }
      } catch (e) {
        winston.info("Confirm-Certification : "+e.message);
        return {
          ok: false,
          error: e.message,
          response: null,
        };
      }
    },
  },
};

export default resolvers;
