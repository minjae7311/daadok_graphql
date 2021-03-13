import Courier from "../../../entities/Courier";
import { Resolvers } from "../../../types/resolvers";
import { EnrollCourierListResponse } from "../../../types/graph";
import { getCourierList } from "../../../utils/functions.shipment";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
const winston = require("../../../config/winston");

// 스마트 택배업체 리스트 가져오기
const resolvers: Resolvers = {
  Mutation: {
    EnrollCourierList: adminPrivateResolvers(
      async (_, _arg, { req }): Promise<EnrollCourierListResponse> => {
        try {
          const courier = await getCourierList();
          const courierOrder = courier.Company.sort((a, b) => {
            return a.Code < b.Code ? -1 : a.Code > b.Code ? 1 : 0;
          });

          for (let i = 0; i < courierOrder.length; i++) {
            await Courier.create({
              code: courierOrder[i].Code,
              name: courierOrder[i].Name,
            }).save();
          }

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Enroll-CourierList : "+e.message);
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
