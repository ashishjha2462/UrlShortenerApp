const express = require("express");
const router = express.Router();
const { shortenUrl, redirectUrl } = require("../controllers/urlController");

router.get("/urls", async (req, res) => {
  try {
    const urls = await require("../models/Url").find().sort({ createdAt: -1 });
    // console.log("Fetching URLs");
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
});

router.delete("/urls/:code", async (req, res) => {
  try {
    const result = await require("../models/Url").deleteOne({ shortCode: req.params.code });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "URL not found" });
    }
    res.json({ message: "URL deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete URL" });
  }
});


router.post("/shorten", shortenUrl);
router.get("/:code", redirectUrl);

module.exports = router;
