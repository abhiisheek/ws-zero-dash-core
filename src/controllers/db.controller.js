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

export default { executeQuery, getAllTables };
