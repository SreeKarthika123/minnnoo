const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const embedModel = genAI.getGenerativeModel({
  model: "text-embedding-004"
});

async function getEmbedding(text) {
  const result = await embedModel.embedContent(text);
  return result.embedding.values; // vector (array of numbers)
}

module.exports = { getEmbedding };
