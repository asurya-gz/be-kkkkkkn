const express = require("express");
const router = express.Router();
const batasTanahController = require("../../controllers/BatasTanah/batasTanahController");

router.get("/all-batastanah", batasTanahController.getAllBatasTanah);
router.post("/create-batastanah", batasTanahController.createBatasTanah);
router.delete("/delete-batastanah", batasTanahController.deleteBatasTanah);
router.post("/getno-batastanah", batasTanahController.getBatasTanahByNomor);

module.exports = router;
