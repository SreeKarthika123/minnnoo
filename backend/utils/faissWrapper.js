// utils/faissWrapper.js
const { GoogleGenerativeAI } = require("@google/generative-ai"); // or OpenAI embeddings
const client = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

// In-memory store for job embeddings
let jobEmbeddings = [];
let jobIds = [];

// ----------------- BUILD INDEX -----------------
async function buildIndex(jobs) {
  jobIds = jobs.map(j => j._id.toString());
  const texts = jobs.map(j => `${(j.skills || []).join(" ")} ${j.jobDescription || ""}`);
  jobEmbeddings = [];

  for (const text of texts) {
    const emb = await getEmbedding(text);
    jobEmbeddings.push(emb);
  }
}

// ----------------- QUERY RESUME -----------------
async function queryResume(resumeText, topK = 5) {
  const resumeEmbedding = await getEmbedding(resumeText);
  const results = [];

  for (let i = 0; i < jobEmbeddings.length; i++) {
    const score = cosineSimilarity(resumeEmbedding, jobEmbeddings[i]) * 100;
    results.push({ jobId: jobIds[i], score });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, topK);
}

// ----------------- EMBEDDING & COSINE -----------------
async function getEmbedding(text) {
  if (!text) return [];
  try {
    const res = await client.embedText({ model: "gemini-2.5-flash", text });
    return res.embedding || [];
  } catch (err) {
    console.error("Embedding error:", err);
    return [];
  }
}

function cosineSimilarity(vecA, vecB) {
  if (!vecA.length || !vecB.length) return 0;
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * (vecB[i] || 0);
    magA += vecA[i] ** 2;
    magB += (vecB[i] || 0) ** 2;
  }
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

module.exports = { buildIndex, queryResume };
