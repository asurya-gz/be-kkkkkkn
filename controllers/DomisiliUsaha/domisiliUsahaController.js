const DomisiliUsahaModel = require("../../models/DomisiliUsaha/domisiliUsahaModel");

const DomisiliUsahaController = {
  // Mengambil semua data domisili usaha
  getAllDomisiliUsaha: (req, res) => {
    DomisiliUsahaModel.getAllDomisiliUsaha((err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Terjadi kesalahan saat mengambil data domisili usaha",
          error: err.message,
        });
      }
      res.status(200).json(result);
    });
  },

  // Membuat domisili usaha baru
  createDomisiliUsaha: (req, res) => {
    const usahaData = req.body;

    DomisiliUsahaModel.createDomisiliUsaha(usahaData, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Terjadi kesalahan saat membuat domisili usaha",
          error: err.message,
        });
      }
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.status(201).json(result);
    });
  },

  // Mengambil domisili usaha berdasarkan nomor surat
  getDomisiliUsahaByNomor: (req, res) => {
    const { nomor_surat } = req.body;

    DomisiliUsahaModel.getDomisiliUsahaByNomor(nomor_surat, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Terjadi kesalahan saat mengambil domisili usaha",
          error: err.message,
        });
      }
      if (!result.success) {
        return res.status(404).json(result);
      }
      res.status(200).json(result);
    });
  },

  // Menghapus domisili usaha berdasarkan nomor surat
  deleteDomisiliUsaha: (req, res) => {
    const { nomor_surat } = req.body;

    DomisiliUsahaModel.deleteDomisiliUsaha(nomor_surat, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Terjadi kesalahan saat menghapus domisili usaha",
          error: err.message,
        });
      }
      if (!result.success) {
        return res.status(404).json(result);
      }
      res.status(200).json(result);
    });
  },
};

module.exports = DomisiliUsahaController;
