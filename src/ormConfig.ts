import { ConnectionOptions } from "typeorm";

const ConnectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "dadok",
  synchronize: true,
  logging: ["error"],
  logger: "file",
  entities: ["entities/*.*"],
  port: 5432,
  host: process.env.DB_ENDPOINT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

export default ConnectionOptions;
