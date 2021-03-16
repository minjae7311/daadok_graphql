/** @format */
const winston = require("../config/winston");

const sellerPrivateResolvers = (resolverFunction) => async (
  parent,
  argument,
  context,
  info
) => {
  if (!context.req.seller) {
    // if seller not exist
    winston.info("No JWT in Seller");
    throw new Error("No JWT. I refuse to proceed. - seller");
  }

  const resolved = await resolverFunction(parent, argument, context, info);

  return resolved;
};

export default sellerPrivateResolvers;
