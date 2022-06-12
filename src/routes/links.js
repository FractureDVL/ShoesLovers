const express = require("express");
const router = express.Router();
const pool = require("../database/database");
const path = require('path');

/*Pagina principal*/
router.get("/index", async (req, res) => {
  const zapato = await pool.query("SELECT * FROM zapatos WHERE serial = 1030 AND nombre != 'Slvrs' AND nombre != 'MoonStrickers'");
  const slvrs = await pool.query("SELECT * FROM zapatos WHERE nombre = 'Slvrs'");
  const moonstrickers = await pool.query("SELECT * FROM zapatos WHERE nombre = 'MoonStrickers'");
  res.render("links/index", {zapato, slvrs, moonstrickers});
});

/*Seccion de hombres*/
router.get("/hombre", async (req, res) => {
  const zapato = await pool.query("SELECT * FROM zapatos WHERE serial = 2030");
  res.render("links/hombre", {zapato});
});
/*Seccion de mujeres*/
router.get("/mujer", async (req, res) => {
  const zapato = await pool.query("SELECT * FROM zapatos WHERE serial = 3030");
  res.render("links/mujer", {zapato});
});
/*Seccion de unisex*/
router.get("/unisex", async (req, res) => {
  const zapato = await pool.query("SELECT * FROM zapatos WHERE serial = 4030");
  res.render("links/unisex", {zapato});
});

router.get("/buscar", (req, res) => {
  res.render("links/buscar");
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
