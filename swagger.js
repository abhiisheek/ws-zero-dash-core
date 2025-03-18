import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  // "./src/routes/project.js",
  // "./src/routes/user.js",
  // "./src/routes/db.js",
  "./src/routes/llm.js"
];

const doc = {
  info: {
    title: "LLM Integration API",
  },
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
