import { Resolvers } from "../../../types/resolvers";
import {
  RequestCertificationResponse,
  RequestCertificationMutationArgs,
} from "../../../types/graph";
import { requestCertification } from "../../../utils/functions.certification";
const winston = require("../../../config/winston");

// 핸드폰 인증 요청
const resolvers: Resolvers = {
  Mutation: {
    RequestCertification: async (
      _res,
      args: RequestCertificationMutationArgs,
      { req }
    ): Promise<RequestCertificationResponse> => {
      const {
        fullName,
        phoneNumber,
        birth,
        gender_digit,
        carrier,
        is_mvno,
      } = args;

      try {
        const result = await requestCertification(
          fullName,
          phoneNumber,
          birth,
          gender_digit,
          carrier,
          is_mvno
        );
        if (result.ok && result.imp_uid) {
          return {
            ok: true,
            error: null,
            imp_uid: result.imp_uid,
          };
        } else {
          return {
            ok: false,
            error: result.error,
            imp_uid: null,
          };
        }
      } catch (e) {
        winston.info("Request-Certification : "+e.message);
        return {
          ok: false,
          error: e.message,
          imp_uid: null,
        };
      }
    },
  },
};

export default resolvers;
