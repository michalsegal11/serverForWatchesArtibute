const express = require('express');
const router = express.Router();
const controllerUser = require('../controller/user')

router.post("/login", controllerUser.login);
router.post("/register", controllerUser.register);
router.get("/profile", controllerUser.login);
router.get("/", controllerUser.get);
router.get("/:id", controllerUser.getById);
router.post("/", controllerUser.post);

module.exports = router;