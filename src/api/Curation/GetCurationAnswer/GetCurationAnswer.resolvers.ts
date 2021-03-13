import { Resolvers } from "../../../types/resolvers";
import { GetCurationAnswerResponse } from "../../../types/graph";
import CurationAnswer from "../../../entities/CurationAnswer";
const winston = require("../../../config/winston");

const resolvers: Resolvers = {
  Query: {
    GetCurationAnswer: async (
      _res,
      _args,
      { req }
    ): Promise<GetCurationAnswerResponse> => {
      try {
        const curationAnswer = await CurationAnswer.find({
          order: { id: "ASC" },
        });

        return {
          ok: true,
          error: null,
          curationAnswer,
        };
      } catch (e) {
        winston.info("Get-Curation-Answer : "+e.message);
        return {
          ok: false,
          error: e.message,
          curationAnswer: null,
        };
      }
    },
  },
};

export default resolvers;
