const express = require("express");
const router = express.Router();
const controller = require("../controllers/cardController");

router.get("/", controller.getAllCards);
router.post("/", controller.createCard);
router.get("/:id", controller.getCard);
router.put("/:id", controller.updateCard);
router.delete("/:id", controller.deleteCard);

module.exports = router;
