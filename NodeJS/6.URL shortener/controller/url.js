const { nanoid } = require("nanoid");
const URL = require("../model/url.js");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).send({ err: "URL is required" });
  const shortId = nanoid(8);

  await URL.create({
    shortId,
    redirectUrl: body.url,
    visitedHistory: [],
  });

  return res.json({
    id: shortId,
  });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    if (!entry) return res.status(404).send({ err: "URL not found" });

    return res.json({
        totalClicks: entry.visitedHistory.length,
        analytics: entry.visitedHistory
    });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics
};
