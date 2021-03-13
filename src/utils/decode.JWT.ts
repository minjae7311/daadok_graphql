/** @format */

import jwt from "jsonwebtoken";
import User from "../entities/User";
import Admin from "../entities/Admin";
import Seller from "../entities/Seller";

const winston = require("../config/winston");

const decodeJWT = async (token: string) => {
  try {

    if(!token) {
      return undefined
    }

    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN || "");

    const { id, deviceId } = decoded;

    if (deviceId === "admin") {
      const admin = await Admin.findOne({ id });

      return { admin, flag: "admin" };
    } else if (deviceId === "user") {
      const user = await User.findOne({ id });

      return { user, flag: "user" };
    } else  {
      const seller = await Seller.findOne({ id });

      return { seller, flag: "seller" };
    }
  } catch (error) {
    winston.info("Decode Token error : ", error);
    console.error("\nDECODE JSON TOKEN ERROR : ", error, "\n");
    return undefined;
  }
};

export default decodeJWT;
