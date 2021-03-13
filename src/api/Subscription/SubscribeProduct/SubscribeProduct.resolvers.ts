// import Subscription from "../../../entities/Subscription";
// import { SubscribeProductMutationArgs, SubscribeProductResponse } from "../../../types/graph";
// import { Resolvers } from "../../../types/resolvers";

// const resolvers: Resolvers = {
// 	Mutation: {
// 		SubscribeProduct: async (_res, args: SubscribeProductMutationArgs, { req }): Promise<SubscribeProductResponse> => {
// 			const { user } = req;
// 			const { productId } = args;

// 			try {
// 				const result = await Subscription.create({});
// 			} catch (error) {
// 				return {
// 					ok: false,
// 					error,
// 				};
// 			}
// 		},
// 	},
// };

// export default resolvers;
