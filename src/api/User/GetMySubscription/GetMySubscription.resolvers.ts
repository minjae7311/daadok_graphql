import { Resolvers } from "../../../types/resolvers";
import { GetMySubscriptionResponse } from "../../../types/graph";
import Subscription from "../../../entities/Subscription";

const winston = require("../../../config/winston");

// 사용자 구독 정보 가져오기
const resolvers: Resolvers = {
  Query: {
    GetMySubscription: async (
      _res,
      _args,
      { req }
    ): Promise<GetMySubscriptionResponse> => {
      const { user } = req;

      try {
        const subscription = await Subscription.createQueryBuilder(
          "subcription"
        )
          .leftJoinAndSelect("subcription.payment", "payment")
          .leftJoinAndSelect("payment.credit", "credit")
          .leftJoinAndSelect("payment.product", "product")
          .leftJoinAndSelect("subcription.address", "address")
          .leftJoinAndSelect("address.user", "user")
          .leftJoinAndSelect("subcription.shipment", "shipment")
          .where({ user: user.id })
          .getMany();

        if (!subscription) {
          return {
            ok: false,
            error: "subscription-not-found",
            subscription: null,
          };
        }
        return {
          ok: true,
          error: null,
          subscription,
        };
      } catch (e) {
        winston.info("Get-MySubscription : " + e.message);
        return {
          ok: false,
          error: e.message,
          subscription: null,
        };
      }
    },
  },
};

export default resolvers;
