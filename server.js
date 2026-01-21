
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Accept plain text body
app.use(express.text({ type: "*/*" }));

app.post("/update", (req, res) => {
  const rawContent = req.body;

  if (!rawContent || typeof rawContent !== "string") {
    return res.status(400).send("Invalid content");
  }

  // Write raw content directly to index.html
  fs.writeFile(path.join(__dirname, "index.html"), rawContent, (err) => {
    if (err) {
      console.error("❌ Failed to write index.html:", err);
      return res.status(500).send("Failed to update index.html");
    }

    console.log("✅ index.html updated with raw content:", rawContent);
    res.send("index.html updated");
  });
});

// Serve the updated file
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
