import { Resolvers } from "../../../types/resolvers";
import {
  UpdateSubscriptionMutationArgs,
  UpdateSubscriptionResponse,
} from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import Subscription from "../../../entities/Subscription";
const winston = require("../../../config/winston");

// 유저 권한 - 반품 요청하기
const resolvers: Resolvers = {
  Mutation: {
    UpdateSubscription: privateResolver(
      async (
        _,
        args: UpdateSubscriptionMutationArgs,
        { req }
      ): Promise<UpdateSubscriptionResponse> => {
        const { subscriptionId } = args;

        try {
          const subscription = await Subscription.findOne({
            id: subscriptionId,
          });

          if (!subscription) {
            return {
              ok: false,
              error: "subscription-not-found",
            };
          }

          await subscription.save();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Update-Subscription : " + e.message);
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
