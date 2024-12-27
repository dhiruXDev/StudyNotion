const express = require("express");
const { chatResponser } = require("../controllers/ChatController");

const router = express.Router();

router.post("/communicating" , chatResponser);
 
module.exports = router; 