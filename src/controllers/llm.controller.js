import axios from "axios";
import { errorHandler } from "../utils/index.js";
import { getPromptWithUserQuery } from "../helpers/sqlPrompt.js";

const generateQuery = async (req, res) => {
  //#swagger.summary  = 'Generate sql query for the given prompt'
  const userQuery = req.body.userQuery;
  const datasourceDetails = req.body.datasourceDetails;
  if (!userQuery || !datasourceDetails) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    const prompt = getPromptWithUserQuery(userQuery, datasourceDetails);

    console.log("Prompt: ", prompt);

    const result = await axios.post("http://localhost:11434/api/generate", {
      model: "sqlcoder",
      prompt,
      stream: false,
    });
    res.send(result.data);
  } catch (error) {
    errorHandler(res, error, 500);
  }
};

export default { generateQuery };
