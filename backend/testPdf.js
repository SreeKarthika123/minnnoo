// testPdf.js
const { extractResumeText } = require("./utils/extractResumeText");

(async () => {
  try {
    const text = await extractResumeText("uploads/reessumee1233-1-1.pdf");
    console.log("Resume text extracted:", text.substring(0, 200), "..."); // first 200 chars
  } catch (err) {
    console.error("Failed to extract resume:", err.message);
  }
})();
