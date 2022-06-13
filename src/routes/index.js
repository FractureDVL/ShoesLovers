const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const zapato = await pool.query("SELECT * FROM zapatos WHERE serial = 1030 AND nombre != 'Slvrs' AND nombre != 'MoonStrickers'");
  const slvrs = await pool.query("SELECT * FROM zapatos WHERE nombre = 'Slvrs'");
  const moonstrickers = await pool.query("SELECT * FROM zapatos WHERE nombre = 'MoonStrickers'");
  res.render("links/index", {zapato, slvrs, moonstrickers});
});

module.exports = router;
