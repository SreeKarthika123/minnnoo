const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

/* ---------- CLEAN TEXT ---------- */
function cleanText(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ---------- VECTORIZE ---------- */
function textToVector(text) {
  const tokens = tokenizer.tokenize(cleanText(text));
  const freq = {};
  tokens.forEach(t => (freq[t] = (freq[t] || 0) + 1));
  return freq;
}

/* ---------- COSINE SIM ---------- */
function cosineSimilarity(vecA, vecB) {
  const keys = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  let dot = 0, magA = 0, magB = 0;

  keys.forEach(k => {
    const a = vecA[k] || 0;
    const b = vecB[k] || 0;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  });

  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

/* ---------- KEYWORD SCORE ---------- */
function keywordScore(resumeText, jobText) {
  const r = new Set(tokenizer.tokenize(cleanText(resumeText)));
  const j = new Set(tokenizer.tokenize(cleanText(jobText)));

  let matched = 0;
  j.forEach(w => r.has(w) && matched++);

  return j.size ? matched / j.size : 0;
}

module.exports = {
  textToVector,
  cosineSimilarity,
  keywordScore,
  cleanText
};
