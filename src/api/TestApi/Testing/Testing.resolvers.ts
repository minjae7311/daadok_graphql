import { TestingResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
	Query: {
		Testing: async (_, __, ___): Promise<TestingResponse> => {
			try {
				return {
					ok: true,
				};
			} catch (error) {
				return {
					ok: false,
				};
			}
		},
	},
};

export default resolvers;
