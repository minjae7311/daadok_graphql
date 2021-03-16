import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateAddressResponse,
  UpdateAddressMutationArgs,
} from "../../../types/graph";
import Address from "../../../entities/Address";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 유저 주소 등록 (주소 api 사용)
const resolvers: Resolvers = {
  Mutation: {
    UpdateAddress: privateResolver(
      async (
        _res,
        args: UpdateAddressMutationArgs,
        { req }
      ): Promise<UpdateAddressResponse> => {
        const { addressId } = args;

        try {
          const existAddr = await Address.findOne({ id: addressId });

          if (existAddr) {
            const inputArgs = Object.keys(cleanNullArgs(args));

            inputArgs.forEach((key) => {
              if (key !== "addressId") {
                existAddr[key] = args[key];
              }
            });

            await existAddr.save();

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "address-not-found",
            };
          }
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
