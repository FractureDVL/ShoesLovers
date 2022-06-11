const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "./src/public/profilepic" });
const shoespic = multer({ dest: "./src/public/shoespic" });
const pool = require("../database/database");

/*Inicio de sesion*/
router.get("/inicio", isNotLoggedIn, (req, res) => {
  res.render("links/auth/inicio", { layout: "full-width" });
});

router.post("/signin", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local.signin", {
    successRedirect: "/perfil",
    failureRedirect: "/inicio",
    failureFlash: true,
  })(req, res, next);
});

/*Registro de usuario*/
router.get("/registro", isNotLoggedIn, (req, res) => {
  res.render("links/auth/registro", { layout: "full-width" });
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/perfil",
    failureRedirect: "/registro",
    failureFlash: true,
  })
);
/* Perfil del usuario y funciones para el usuario*/
router.get("/perfil", (req, res) => {
  res.render("links/Jinja/perfil");
});

/*Cambiar foto de perfil*/
router.post("/subir/:id", upload.single("imagen"), async (req, res) => {
  const { id } = req.params;
  console.log(req.file);
  fs.renameSync(
    req.file.path,
    req.file.path + "." + req.file.mimetype.split("/")[1]
  );
  const ola = "." + req.file.mimetype.split("/")[1];
  await pool.query("UPDATE usuario SET imagen = ? WHERE id = ?", [
    req.file.filename + ola,
    id,
  ]);

  res.redirect("/perfil");
});
/*Salir y loguearse*/
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/inicio");
});

router.get("/cart", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("links/cart");
  } else {
    res.redirect("/inicio");
  }
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

router.get("/agregaradm", (req, res) => {
  res.render("links/admin/agregaradm");
});

router.get("/editaradm", (req, res) => {
  res.render("links/admin/editaradm");
});

router.post("/addShoes", shoespic.single("imagen"), async (req, res) => {
  const { categoria, nombre, talla, cantidad, precio } = req.body;

  const comprobar = await pool.query(
    "SELECT * FROM zapatos WHERE categoria = ? AND talla = ? AND nombre = ?",
    [categoria, talla, nombre]
  );

  if (comprobar.length > 0) {
    const zapatorepet = comprobar[0];
    console.log(zapatorepet);
    const suma = parseInt(cantidad, 10) + parseInt(zapatorepet.cantidad, 10);
    pool.query(
      "UPDATE zapatos set cantidad = ? WHERE categoria = ? AND talla = ? AND nombre = ?",
      [suma, categoria, talla, nombre]
    );
    res.redirect("/links/admin");
  } else {

    fs.renameSync(
      req.file.path,
      req.file.path + "." + req.file.mimetype.split("/")[1]
    );
    const imagen = req.file.filename + "." + req.file.mimetype.split("/")[1];

    const rows = await pool.query("SELECT * FROM zapatos WHERE nombre = ?", [
      nombre,
    ]);

    const id_zapato = categoria + talla + rows.length;

    const zapato = {
      id_zapato,
      categoria,
      nombre,
      talla,
      cantidad,
      precio,
      imagen,
    };
    console.log(zapato);
    pool.query("INSERT INTO zapatos SET ?", zapato);
    res.redirect("/links/admin");
  }
});

// passport.deserializeUser((usr, done)=>{
// })
module.exports = router;
