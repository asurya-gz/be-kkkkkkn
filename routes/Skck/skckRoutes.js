const express = require("express");
const router = express.Router();
const skckController = require("../../controllers/Skck/skckController");

router.get("/all-skck", skckController.getAllSKCK);
router.post("/create-skck", skckController.createSKCK);
router.delete("/delete-skck", skckController.deleteSKCK);
router.post("/getno-skck", skckController.getSKCKByNomor);

module.exports = router;
