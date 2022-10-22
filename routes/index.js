const express = require("express");
const router = express.Router();

const reminder = require("../controllers/reminders.controller");


router.get("/", reminder.findAll);
router.post("/", reminder.create);
router.get("/:id", reminder.findOne);

router.delete("/:id", reminder.handleModify);
router.put("/:id", reminder.handleModify);
router.patch("/:id", reminder.handleModify);

module.exports = router;
