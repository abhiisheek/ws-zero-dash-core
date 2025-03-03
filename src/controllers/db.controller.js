import { errorHandler } from "../utils/index.js";
import { getConnection, json2csvArray } from "../helpers/db.js";

const executeQuery = async (req, res) => {
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

export default { executeQuery };
