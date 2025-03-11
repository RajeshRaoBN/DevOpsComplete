// In src/routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getOneUser);

router.post("/", userController.createNewUser);

router.patch("/:userId", userController.updateOneUser);

router.delete("/:userId", userController.deleteOneUser);

module.exports = router;