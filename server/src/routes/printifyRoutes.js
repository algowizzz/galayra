const express = require("express");
const router = express.Router();

const { syncProducts } = require("../controllers/printifyController");

router.post("/sync", syncProducts);

module.exports = router;
