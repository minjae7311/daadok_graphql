import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  EnrollCurationAnswerResponse,
  EnrollCurationAnswerMutationArgs,
} from "../../../types/graph";
import CurationAnswer from "../../../entities/CurationAnswer";
import CurationForm from "../../../entities/CurationForm";
const winston = require("../../../config/winston");

// 유저 권한 - 큐레이션에 대한 답변 작성
const resolvers: Resolvers = {
  Mutation: {
    EnrollCurationAnswer: privateResolver(
      async (
        _res,
        args: EnrollCurationAnswerMutationArgs,
        { req }
      ): Promise<EnrollCurationAnswerResponse> => {
        const { user } = req;
        const { curationFormId, answeredJson } = args;

        try {
          const curationForm = await CurationForm.findOne(
            { id: curationFormId },
            { relations: ["seller"] }
          );

          if (!curationForm) {
            return {
              ok: false,
              error: "curationFrom-not-found",
            };
          }

          await CurationAnswer.create({
            curationForm,
            answeredJson,
            user,
          }).save();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Enroll-Curation-Answer : "+e.message);
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
