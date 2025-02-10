const express = require("express");
const router = express.Router();
const belumMenikahController = require("../../controllers/BelumMenikah/belumMenikahController");

router.get(
  "/all-belummenikah",
  belumMenikahController.getAllKeteranganBelumMenikah
);
router.post(
  "/create-belummenikah",
  belumMenikahController.createKeteranganBelumMenikah
);
router.delete(
  "/delete-belummenikah",
  belumMenikahController.deleteKeteranganBelumMenikah
);
router.post(
  "/getno-belummenikah",
  belumMenikahController.getKeteranganBelumMenikahByNomor
);

module.exports = router;
