const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("links/index");
});

module.exports = router;
