const express = require("express");
const router = express.Router();
const suratCutiController = require("../../controllers/SuratCuti/suratCutiController");

router.get("/all-suratcuti", suratCutiController.getAllSuratCuti);
router.post("/create-suratcuti", suratCutiController.createSuratCuti);
router.delete("/delete-suratcuti", suratCutiController.deleteSuratCuti);
router.post("/getno-suratcuti", suratCutiController.getSuratCutiByNomor);

module.exports = router;
