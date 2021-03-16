import jwt from "jsonwebtoken";
/**
 * @param {number} id
 * @returns {string} token
 */
const createJWT = (id: number, deviceId: string): string => {
  const token = jwt.sign(
    {
      id,
      deviceId,
    },
    process.env.JWT_TOKEN || ""
  );

  return token;
};

export default createJWT;
