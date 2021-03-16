import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  SetMainAddressMutationArgs,
  SetMainAddressResponse,
} from "../../../types/graph";
import Address from "../../../entities/Address";
const winston = require("../../../config/winston");

// 메인으로 등록할 주소 - isMain이 true 일떄
const resolvers: Resolvers = {
  Mutation: {
    SetMainAddress: privateResolver(
      async (
        _res,
        args: SetMainAddressMutationArgs,
        { req }
      ): Promise<SetMainAddressResponse> => {
        const { user } = req;
        const { addressId } = args;

        try {
          const address = await Address.findOne({
            id: addressId,
          });

          if (!address) {
            return {
              ok: false,
              error: "address-not-found",
            };
          }

          const addressList = await Address.find({user});

          addressList.forEach((address) => {
            if (address.isMain == true) {
              address.isMain = false;
              address.save();
            }
          });

          address.isMain = true;
          await address.save();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Set-MainAddress : "+e.message );
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
