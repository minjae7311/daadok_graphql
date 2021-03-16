import { Resolvers } from "../../../types/resolvers";
import Enquiry from "../../../entities/Enquiry";
import { GetEnquiryResponse, GetEnquiryQueryArgs } from "../../../types/graph";
const winston = require("../../../config/winston");

// 해당 상품에 문의한 내역들을 가져오기
const resolvers: Resolvers = {
  Query: {
    GetEnquiry: async (
      _res,
      args: GetEnquiryQueryArgs,
      { req }
    ): Promise<GetEnquiryResponse> => {
      const { productId, take } = args;

      try {
        const enquiry = await Enquiry.find({
          where: [{ product: productId }],
          order: { createdAt: "DESC" },
          take: 8 + take,
          relations: ["product", "user"],
        });

        return {
          ok: true,
          error: null,
          enquiry,
        };
      } catch (e) {
        winston.info("Get-Enquiry : "+e.message);
        return {
          ok: false,
          error: e.message,
          enquiry: null,
        };
      }
    },
  },
};

export default resolvers;
