const express = require("express");
const router = express.Router();
const userControler = require ("./userControler");

router.post("/login",userControler.findUserByMailAndPassword)

router.get("/users",userControler.findAllUsers)

router.post("/register",userControler.addUser)

router.put("/updatemail",userControler.updateUserMail)

router.put("/updatepass",userControler.updateUserPassword)

router.delete("/delete/:mail",userControler.deleteUser)


module.exports = router