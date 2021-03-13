import { Resolvers } from "../../../types/resolvers";
import {
  GetShipmentResponse,
  GetShipmentQueryArgs,
} from "../../../types/graph";
import { inquiryShipment } from "../../../utils/functions.shipment";
import Shipment from "../../../entities/Shipment";
const winston = require("../../../config/winston");

// 택배 배송 상황 가져오기
const resolvers: Resolvers = {
  Query: {
    GetShipment: async (
      _res,
      args: GetShipmentQueryArgs,
      { req }
    ): Promise<GetShipmentResponse> => {
      const { shipmentId } = args;

      try {
        for (let i = 0; i < shipmentId.length; i++) {
          const shipment = await Shipment.findOne({ id: shipmentId[i] });

          if (!shipment) {
            return {
              ok: false,
              error: "shipment-not-found",
            };
          }

          const tracking = await inquiryShipment(shipment);
          const info = tracking.shipment;
          const details = tracking.shipment.trackingDetails;

          shipment.complete = info.complete;
          shipment.status = details[details.length - 1].kind;
          shipment.location = details[details.length - 1].where;

          await shipment.save();
        }

        return {
          ok: true,
          error: null,
        };
      } catch (e) {
        winston.info("Get-Shipment : " + e.message);
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
