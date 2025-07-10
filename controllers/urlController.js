const Url = require("../models/Url");
const validUrl = require("valid-url");
const shortid = require("shortid");
const { BASE_URL } = process.env;

exports.shortenUrl = async (req, res) => {
  const { url, expiresAt } = req.body;

  if (!validUrl.isUri(url)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  let expiry = undefined;
  if (expiresAt) {
    const parsed = new Date(expiresAt);
    if (isNaN(parsed.getTime())) {
      return res.status(400).json({ error: "Invalid expiresAt format. Use ISO 8601 like '2025-07-15T12:00:00Z'." });
    }
    expiry = parsed;
  }
  else{
    expiry = new Date(Date.now() + 10 * 60 * 1000);
  }

  const code = shortid.generate();

  try {
    const newUrl = new Url({
      originalUrl: url,
      shortCode: code,
      expiresAt: expiry,
    });
    await newUrl.save();
    console.log(`Short URL created: ${BASE_URL}/${code} (expires at ${expiry})`);
    res.json({ shortUrl: `${BASE_URL}/${code}` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.redirectUrl = async (req, res) => {
  const { code } = req.params;

  try {
    const found = await Url.findOne({ shortCode: code });

    if (!found) return res.status(404).json({ error: "Short URL not found" });

    if (found.expiresAt && new Date() > found.expiresAt) {
      return res.status(410).json({ error: "URL expired" });
    }
    found.clickCount += 1; // For analytics (bonus)
    await found.save();

    res.redirect(found.originalUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
