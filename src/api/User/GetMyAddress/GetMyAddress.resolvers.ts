import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyAddressResponse } from "../../../types/graph";
import Address from "../../../entities/Address";
const winston = require("../../../config/winston");

// 유저 권한 - 등록한 주소 가져오기
const resolvers: Resolvers = {
  Query: {
    GetMyAddress: privateResolver(
      async (_res, _args, { req }): Promise<GetMyAddressResponse> => {
        const { user } = req;

        try {
          const address = await Address.find({ user: user.id });

          return {
            ok: true,
            error: null,
            address,
          };
        } catch (e) {
          winston.info("Get-MyAddress : "+e.message);
          return {
            ok: false,
            error: e.message,
            address: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
