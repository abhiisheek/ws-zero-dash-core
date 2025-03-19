import { errorHandler } from "../utils/index.js";
import { getConnection, json2csvArray } from "../helpers/db.js";

const executeQuery = async (req, res) => {
  //#swagger.summary  = 'Execute the given query for results'
  const query = req.body.query;
  if (!query) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    const connection = await getConnection();
    const [result, metadata] = await connection.query(query);
    connection.release();
    const csv = json2csvArray(result);
    res.send({ data: csv, metadata: metadata[0] });
  } catch (error) {
    errorHandler(res, error, 500);
  }
};

const getAllTables = async (req, res) => {
  //#swagger.summary  = 'Retrieve all tables for the given database'
  const database = req.params["database"];
  if (!database) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      `SELECT TABLE_NAME AS 'tableName' FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_SCHEMA = '${database}' and Table_type= "BASE TABLE";`
    );
    connection.release();
    res.send(result);
  } catch (error) {
    errorHandler(res, error, 500);
  }
};

const getTablesMetadata = async (req, res) => {
  //#swagger.summary  = 'Retrieve metadata for the given tables & database'
  const database = req.params["database"];
  const tables = req.body.tables;
  if (!database || !Array.isArray(tables)) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    const connection = await getConnection();
    const result = {};

    tables.forEach(async (tableName, index) => {
      const [metadata] = await connection.query(
        `SELECT COLUMN_NAME AS "column", DATA_TYPE AS "type" FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = '${database}' AND Table_NAME = '${tableName}';`
      );

      result[tableName] = metadata;

      if (index === tables.length - 1) {
        connection.release();
        res.send(result);
      }
    });
  } catch (error) {
    errorHandler(res, error, 500);
  }
};

export default { executeQuery, getAllTables, getTablesMetadata };
