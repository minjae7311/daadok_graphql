import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  DeleteAddressMutationArgs,
  DeleteAddressResponse,
} from "../../../types/graph";
import Address from "../../../entities/Address";
const winston = require("../../../config/winston");

// 유저가 선택한 주소 정보를 제거
const resolvers: Resolvers = {
  Mutation: {
    DeleteAddress: privateResolver(
      async (
        _res,
        args: DeleteAddressMutationArgs,
        { req }
      ): Promise<DeleteAddressResponse> => {
        const { user } = req;
        const { addressId } = args;

        try {
          const address = await Address.findOne(
            { id: addressId },
            { relations: ["user"] }
          );

          if (!address) {
            return {
              ok: false,
              error: "address-not-found",
            };
          }

          if (address.user.id != user.id) {
            return {
              ok: false,
              error: "un-auth-to-this-address",
            };
          }

          await address.softRemove();
          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Delete-Address : "+e.message);

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
