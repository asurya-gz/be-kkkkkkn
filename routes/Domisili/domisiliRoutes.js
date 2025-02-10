const express = require("express");
const router = express.Router();
const domisiliController = require("../../controllers/Domisili/domisiliController");

router.get("/all-domisili", domisiliController.getAllKeteranganDomisili);
router.post("/create-domisili", domisiliController.createKeteranganDomisili);
router.delete("/delete-domisili", domisiliController.deleteKeteranganDomisili);
router.post("/getno-domisili", domisiliController.getKeteranganDomisiliByNomor);

module.exports = router;
