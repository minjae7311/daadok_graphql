import { Resolvers } from "../../../types/resolvers";
import Banner from "../../../entities/Banner";
import { GetBannerResponse } from "../../../types/graph";
const winston = require("../../../config/winston");

// 카테고리 및 서브 카테고리 목록 가져오기
const resolvers: Resolvers = {
	Query: {
		GetBanner: async (_res, _args, _): Promise<GetBannerResponse> => {
			try {
				const banner = await Banner.find({
					relations: ["seller"],
					order: { id: "ASC" },
				});

				return {
					ok: true,
					error: null,
					banner,
				};
			} catch (e) {
				winston.info("Get-Banner : " + e.message);
				return {
					ok: false,
					error: e.message,
					banner: null,
				};
			}
		},
	},
};

export default resolvers;
