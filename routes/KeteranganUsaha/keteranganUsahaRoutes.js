const express = require("express");
const router = express.Router();
const keteranganUsahController = require("../../controllers/KeteranganUsaha/keteranganUsahaController");

router.get(
  "/all-keteranganusaha",
  keteranganUsahController.getAllKeteranganUsaha
);
router.post(
  "/create-keteranganusaha",
  keteranganUsahController.createKeteranganUsaha
);
router.delete(
  "/delete-keteranganusaha",
  keteranganUsahController.deleteKeteranganUsaha
);
router.post(
  "/getno-keteranganusaha",
  keteranganUsahController.getKeteranganUsahaByNomor
);

module.exports = router;
