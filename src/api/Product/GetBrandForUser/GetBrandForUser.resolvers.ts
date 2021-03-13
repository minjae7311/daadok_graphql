import { Resolvers } from "../../../types/resolvers";
import Seller from "../../../entities/Seller";
import User from "../../../entities/User";
import Keyword from "../../../entities/Keyword";
import { GetBrandForUserResponse } from "../../../types/graph";
import shuffleArray from "../../../utils/shuffleArray";
import privateResolver from "../../../utils/privateResolver";
import { In } from "typeorm";
import getAge from "../../../utils/getAge";
const winston = require("../../../config/winston");

// 메인 페이지 유저 추천 상품들 가져오기
const resolvers: Resolvers = {
  Query: {
    GetBrandForUser: privateResolver(
      async (_res, _arg, { req }): Promise<GetBrandForUserResponse> => {
        const { user } = req;

        try {
          // 유저의 나이, 성별, 취미를 고려하여 상품 가져오기
          const userAge = getAge(user.birthDate.replace(/(.{2})/g, '$1/').slice(-9, 8));
          const age = Math.floor(userAge / 10) * 10;
          const currentUser = await User.findOne(
            { id: user.id },
            { relations: ["interest"] }
          );

          const interestName = currentUser?.interest.map((item) => {
            return item.name;
          });

          const interestRan = shuffleArray(interestName);

          const keyword = await Keyword.createQueryBuilder("keyword")
            .leftJoinAndSelect("keyword.seller", "seller")
            .where({ value: In([age, user.gender, interestRan[0]]) })
            .orderBy({ key: "ASC" })
            .getMany();

          const valueProduct = keyword.map((item) => {
            return item.seller;
          });

          const totalProduct = valueProduct.reduce((a, b: any) => {
            return a.concat(b);
          }, []);

          const duplicateCount = totalProduct.reduce(function (a, b) {
            a[b.id] = (a[b.id] || 0) + 1;
            return a;
          }, {});

          const sortedId = Object.keys(duplicateCount).sort(function (a, b) {
            return duplicateCount[b] - duplicateCount[a];
          });

          const items: any[] = [];

          const searchItem = async (array) => {
            for (const item of array) {
              const userProduct = await Seller.findOne({ id: Number(item) });
              items.push(userProduct);
            }
            return items;
          };

          const userItem = (await searchItem(sortedId)).slice(0, 4);

          return {
            ok: true,
            error: null,
            seller: userItem,
          };
        } catch (e) {
          winston.info("Get-BrandforUser : "+e.message);
          return {
            ok: false,
            error: e.message,
            seller: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
