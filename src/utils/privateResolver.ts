const winston = require("../config/winston");

const privateResolver = (resolverFunction) => async (
  parent,
  argument,
  context,
  info
) => {
  if (!context.req.user) {
    // if user not exist
    winston.info("No JWT in User");

    throw new Error("No JWT. I refuse to proceed! - user");
  }

  const resolved = await resolverFunction(parent, argument, context, info);

  return resolved;
};

export default privateResolver;
