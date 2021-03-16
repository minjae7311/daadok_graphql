/** @format */

import { Options } from "graphql-yoga";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();
import fs from "fs";
import ConnectionOptions from "./ormConfig";
import { createConnection } from "typeorm";
import decodeJWT from "./utils/decode.JWT";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";
const	cert = fs.readFileSync('./keys/api.daadok.com_20210316GWCB.crt');
const key = fs.readFileSync('./keys/api.daadok.com_20210316GWCB.key');

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  https:{key:key,cert:cert},
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async (connectionParams) => {
      const token = connectionParams["X-JWT"];
      const person = await decodeJWT(token);

      const currentUser = person?.user;
      const currentAdmin = person?.admin;
      const currentSeller = person?.seller;
      return {
        currentUser,
        currentAdmin,
        currentSeller,
      };
    },
  },
};

const handleAppStart = () => {
  console.log("\n\n\n\n\n\nSTART APP..");
  console.info(
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString()
  );
  console.log(`Listening on port ${PORT}`);
};

// createConnection(ConnectionOptions)
//   .then(() => {
//     app.start(appOptions, handleAppStart);
//   })
//   .catch((error) => console.log(error));

const appStart = () => {
  return new Promise((resolve, reject) => {
    createConnection(ConnectionOptions).then((connection) => {
      const { entityMetadatas } = connection;
      resolve(entityMetadatas);
      
      app.start(appOptions, handleAppStart);
    });
  });
};

export const entities: any = appStart();
