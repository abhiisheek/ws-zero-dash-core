import jwt from "jsonwebtoken";

import secret from "../utils/secret.js";

export const getRequestHeaders = (req) => {
  const authorization = req.get("Authorization");
  const apiKey = req.get("X-API-KEY");

  const headers = {};

  if (authorization) {
    headers["Authorization"] = authorization;
  } else if (apiKey) {
    headers["X-API-KEY"] = apiKey;
  }

  return headers;
};

export const getUserDetailsFromToken = (req) => {
  const authorization = req.get("Authorization");
  const token = authorization.startsWith("Bearer ") && authorization.slice(7);
  const data = jwt.verify(token, secret.key);

  return data.data;
};
