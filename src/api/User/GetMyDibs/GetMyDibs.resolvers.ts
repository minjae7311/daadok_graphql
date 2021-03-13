import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyDibsResponse } from "../../../types/graph";
import Dibs from "../../../entities/Dibs";
const winston = require("../../../config/winston");

// 유저가 찜한 상품에 등록한 상품들을 가져오기
const resolvers: Resolvers = {
  Query: {
    GetMyDibs: privateResolver(
      async (_res, _args, { req }): Promise<GetMyDibsResponse> => {
        const { user } = req;

        try {
          const dibs = await Dibs.find({
            where: { user: user.id },
            relations: ["product", "user"],
          });

          return {
            ok: true,
            error: null,
            dibs,
          };
        } catch (e) {
          winston.info("Get-MyDibs : "+e.message);
          return {
            ok: false,
            error: e.message,
            dibs: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
