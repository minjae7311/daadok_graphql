import { Resolvers } from "../../../types/resolvers";
// import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
import {
  EnrollShipmentResponse,
  EnrollShipmentMutationArgs,
} from "../../../types/graph";
import Shipment from "../../../entities/Shipment";
import Subscription from "../../../entities/Subscription";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 배송 정보 입력 (운송장번호 / 택배업체)
const resolvers: Resolvers = {
  Mutation: {
    EnrollShipment: (
      async (
        _res,
        args: EnrollShipmentMutationArgs,
        { req }
      ): Promise<EnrollShipmentResponse> => {
        const { tracking_number, subscriptionId } = args;

        try {
          const existingShipment = await Shipment.findOne({
            tracking_number,
          });

          if (existingShipment) {
            return {
              ok: false,
              error: "shipment-existing",
            };
          }

          const subscription = await Subscription.findOne(
            {
              id: subscriptionId,
            },
            { relations: ["shipment"] }
          );
          const notNullArgs = cleanNullArgs(args);
          const newShipment = await Shipment.create({
            ...notNullArgs,
          }).save();

          if (subscription) {
            subscription["shipment"] = newShipment;
            await subscription.save();
          }
          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Enroll-Shipment : "+e.message);
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
