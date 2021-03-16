/** @format */
const winston = require("../config/winston");

const adminPrivateResolvers = (resolverFunction) => async (
  parent,
  argument,
  context,
  info
) => {
  if (!context.req.admin) {
    // if user not exist
    winston.info("No JWT in Admin");
    throw new Error("No JWT. I refuse to proceed. - admin");
  }

  const resolved = await resolverFunction(parent, argument, context, info);

  return resolved;
};

export default adminPrivateResolvers;
