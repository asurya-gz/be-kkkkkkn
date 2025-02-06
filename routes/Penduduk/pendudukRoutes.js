const express = require("express");
const router = express.Router();
const pendudukController = require("../../controllers/Penduduk/pendudukController");

router.get("/all-penduduk", pendudukController.getAllPenduduk);
router.post("/register-penduduk", pendudukController.registerPenduduk);
router.delete("/delete-penduduk", pendudukController.deletePenduduk);

module.exports = router;
