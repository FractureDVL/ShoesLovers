const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

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
    successRedirect: "/inicio",
    failureRedirect: "/registro",
    failureFlash: true,
  })
);
/* Perfil del usuario y funciones para el usuario*/
router.get("/perfil", (req, res) => {
  res.render("links/Jinja/perfil");
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/inicio");
});

router.get("/cart", (req, res) => {
  if(req.isAuthenticated()){
  res.render("links/cart");
  }else{
    res.redirect("/inicio");
  }
});

// passport.deserializeUser((usr, done)=>{
// })
module.exports = router;
