const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: "./src/public/shoespic" });





module.exports = router;