import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyPaymentResponse } from "../../../types/graph";
import Payment from "../../../entities/Payment";
import Credit from "../../../entities/Credit";
const winston = require("../../../config/winston");

// 유저 권한 - 결제 이력 및 구독 현황 가져오기
const resolvers: Resolvers = {
  Query: {
    GetMyPayment: privateResolver(
      async (_res, _args, { req }): Promise<GetMyPaymentResponse> => {
        const { user } = req;

        try {
          const credit = await Credit.find({
            where: { user },
          });

          const creditList = credit.map((item) => {
            return { credit: item.id };
          });

          const payment = await Payment.find({
            relations: ["credit", "product"],
            where: [{ credit: creditList }, { status: "결제완료" }],
            order: { updatedAt: "DESC" },
          });

          if (payment) {
            return {
              ok: true,
              error: null,
              payment:null
            };
          } else {
            return {
              ok: false,
              error: "payment-not-found",
              payment: null,
            };
          }
        } catch (e) {
          winston.info("Get-MyPayment : " + e.message);
          return {
            ok: false,
            error: e.message,
            payment: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
