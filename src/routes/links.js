const express = require("express");
const router = express.Router();
const pool = require("../database/database");

/*Pagina principal*/
router.get("/index", (req, res) => {
  res.render("links/index");
});

/*Seccion de hombres*/
router.get("/hombre", (req, res) => {
  res.render("links/hombre");
});
/*Seccion de mujeres*/
router.get("/mujer", (req, res) => {
  res.render("links/mujer");
});
/*Seccion de unisex*/
router.get("/unisex", (req, res) => {
  res.render("links/unisex");
});

router.get("/Jinja/editar/:id", async (req, res) => {
  const { id } = req.params;
  const perfil = await pool.query("SELECT * FROM usuario WHERE id = ?", [id]);
  console.log(perfil[0]);
  res.render("links/Jinja/editar", { links: perfil[0] });
});

router.post("/Jinja/editar/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, edad, direccion } = req.body;

  const editado = {
    nombre,
    apellido,
    edad,
    direccion,
  };
  console.log(editado);
  await pool.query("UPDATE usuario set ? WHERE id = ?", [editado, id]);
  res.redirect("/perfil");
});

module.exports = router;
