import mysql from "mysql2/promise";

import logger from "../utils/logger.js";

let pool;

export const json2csvArray = (data) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  if (data.length === 0) {
    return [];
  }

  const result = [Object.keys(data[0])];

  data.forEach((item) => {
    result.push(Object.values(item));
  });

  return result;
};

try {
  pool = mysql.createPool({
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    port: process.env.mysql_port,
  });
} catch (err) {
  logger.info("Failed to connect to DB...", err);
}

export const getConnection = async () => {
  if (!pool) {
    throw new Error("Connection pool not created");
  }

  return await pool.getConnection();
};
