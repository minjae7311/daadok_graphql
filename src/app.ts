/** @format */

import cors from "cors";
import { GraphQLServer, PubSub } from "graphql-yoga";
import { NextFunction, Response } from "express";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decode.JWT";
import path from "path";
import fs from "fs";
const winston = require("./config/winston");

class App {
  public app: GraphQLServer;
  /**
   * @todo Change to @redis or @Memcached
   */
  public pubSub: any;

  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);

    this.app = new GraphQLServer({
      schema,
      context: (req) => {
        const { connection: { context = null } = {} } = req;
        return {
          req: req.request,
          pubSub: this.pubSub,
          context,
          userIp: req.request.headers['x-forwarded-for']
        };
      },
    });
    this.middlewares();
  }
  
  /**
   * import middlewares
   */
  private middlewares = (): void => {
    this.app.express.use("*", cors());
    this.app.express.use(
      logger("combined", {
        skip: (req, res) => {
          return res.statusCode < 400;
        },
        stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
          flags: "a",
        }),
      })
    );
    this.app.express.use(this.jwt);
    winston.info(`Listening on port 4000...`);
  };

  private jwt = async (
    req,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("X-JWT");
    // console.log(token)

    if (token) {
      const person = await decodeJWT(token);

      // console.log(person);

      if (person) {
        if (person.flag === "admin") req.admin = person.admin;
        else if (person.flag === "user") req.user = person.user;
        else req.seller = person.seller;
      } else {
        req.admin = undefined;
        req.user = undefined;
        req.seller = undefined;
      }
    }
    
    next();
  };
  
}
export default new App().app;
