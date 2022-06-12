const express = require("express");
const router = express.Router();
const pool = require("../database/database");
const path = require('path');

/*Pagina principal*/
router.get("/index", async (req, res) => {
  const zapato = await pool.query("SELECT * FROM zapatos WHERE categoria = 10");
  res.render("links/index", {zapato});
});

/*Seccion de hombres*/
router.get("/hombre", async (req, res) => {
  const zapato = await pool.query("SELECT * FROM zapatos WHERE categoria = 20");
  res.render("links/hombre", {zapato});
});
/*Seccion de mujeres*/
router.get("/mujer", async (req, res) => {
  const zapato = await pool.query("SELECT * FROM zapatos WHERE categoria = 30");
  res.render("links/mujer", {zapato});
});
/*Seccion de unisex*/
router.get("/unisex", async (req, res) => {
  const zapato = await pool.query("SELECT * FROM zapatos WHERE categoria = 40");
  res.render("links/unisex", {zapato});
});

router.get("/admin", (req, res) => {
  res.render("links/admin/admin");
});

router.get("/agregaradm", (req, res) => {
  res.render("links/admin/agregaradm");
});

router.get("/editaradm", (req, res) => {
  res.render("links/admin/editaradm");
});

module.exports = router;
