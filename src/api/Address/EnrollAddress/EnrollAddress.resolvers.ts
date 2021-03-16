import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  EnrollAddressResponse,
  EnrollAddressMutationArgs,
} from "../../../types/graph";
import Address from "../../../entities/Address";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 유저 주소 등록 (주소 api 사용)
const resolvers: Resolvers = {
  Mutation: {
    EnrollAddress: privateResolver(
      async (
        _res,
        args: EnrollAddressMutationArgs,
        { req }
      ): Promise<EnrollAddressResponse> => {
        const { user } = req;

        try {
          const notNullArgs = cleanNullArgs(args);
          await Address.create({
            user,
            ...notNullArgs,
          }).save();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Enroll-Address : " + e.message);
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
