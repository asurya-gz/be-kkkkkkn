const express = require("express");
const router = express.Router();
const domisiliUsahaController = require("../../controllers/DomisiliUsaha/domisiliUsahaController");

router.get("/all-domisiliusaha", domisiliUsahaController.getAllDomisiliUsaha);
router.post("/create-domisiliusaha", domisiliUsahaController.createDomisiliUsaha);
router.delete("/delete-domisiliusaha", domisiliUsahaController.deleteDomisiliUsaha);    
router.post("/getno-domisiliusaha", domisiliUsahaController.getDomisiliUsahaByNomor);

module.exports = router;
