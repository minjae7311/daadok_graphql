import Product from "../../../entities/Product";
import ViewedProduct from "../../../entities/ViewedProduct";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateViewedProductMutationArgs,
  UpdateViewedProductResponse,
} from "../../../types/graph";
const winston = require("../../../config/winston");

// 유저 권한 - 봤던 상품들 정보 저장
const resolvers: Resolvers = {
  Mutation: {
    UpdateViewedProduct: privateResolver(
      async (
        _,
        args: UpdateViewedProductMutationArgs,
        { req }
      ): Promise<UpdateViewedProductResponse> => {
        const { user } = req;
        const { productId } = args;

        try {
          const product = await Product.findOne({ id: productId });

          if (!product) {
            return {
              ok: false,
              error: "invalid-product",
            };
          }

          const viewed = await ViewedProduct.findOne({
            where: { product: productId, user: user.id },
          });
          if (viewed) {
            await viewed.remove();
          }

          const viewedProduct = await ViewedProduct.create({
            product,
            user,
          }).save();

          if (viewedProduct) {
            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "failed-to-update-viewedproduct",
            };
          }
        } catch (e) {
          winston.info("Update-ViewdProduct : "+e.message);
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
