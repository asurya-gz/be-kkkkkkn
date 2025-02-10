const KeteranganDomisiliModel = require("../../models/Domisili/domisiliModel");

exports.getAllKeteranganDomisili = async (req, res) => {
  try {
    KeteranganDomisiliModel.getAllKeteranganDomisili((err, result) => {
      if (err) {
        console.error("❌ Server Error:", err.message);
        return res.status(500).json({
          success: false,
          message: "Terjadi kesalahan pada server.",
        });
      }

      if (!result.success) {
        return res.status(404).json({
          success: false,
          message: result.message,
        });
      }

      res.status(200).json({
        success: true,
        message: result.message,
        keteranganDomisili: result.keteranganDomisili,
      });
    });
  } catch (error) {
    console.error("❌ Unexpected Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan yang tidak terduga pada server.",
    });
  }
};

exports.createKeteranganDomisili = async (req, res) => {
  try {
    const {
      nomor_surat,
      nama,
      tempat_lahir,
      tanggal_lahir,
      bukti_diri,
      agama,
      pekerjaan,
      alamat,
      domisili,
      kepala_desa,
    } = req.body;

    // Validasi input
    if (
      !nomor_surat ||
      !nama ||
      !tempat_lahir ||
      !tanggal_lahir ||
      !pekerjaan ||
      !agama ||
      !bukti_diri ||
      !alamat ||
      !domisili ||
      !kepala_desa
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua kolom wajib harus diisi.",
      });
    }

    KeteranganDomisiliModel.createKeteranganDomisili(
      {
        nomor_surat,
        nama,
        tempat_lahir,
        tanggal_lahir,
        bukti_diri,
        agama,
        pekerjaan,
        alamat,
        domisili,
        kepala_desa,
      },
      (err, result) => {
        if (err) {
          console.error("❌ Server Error:", err.message);
          return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server.",
          });
        }

        if (!result.success) {
          return res.status(400).json({
            success: false,
            message: result.message,
          });
        }

        res.status(201).json({
          success: true,
          message: result.message,
        });
      }
    );
  } catch (error) {
    console.error("❌ Unexpected Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan yang tidak terduga pada server.",
    });
  }
};

exports.getKeteranganDomisiliByNomor = async (req, res) => {
  try {
    const { nomor_surat } = req.body;

    if (!nomor_surat) {
      return res.status(400).json({
        success: false,
        message: "Nomor surat diperlukan.",
      });
    }

    KeteranganDomisiliModel.getKeteranganDomisiliByNomor(
      nomor_surat,
      (err, result) => {
        if (err) {
          console.error("❌ Server Error:", err.message);
          return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server.",
          });
        }

        if (!result.success) {
          return res.status(404).json({
            success: false,
            message: result.message,
          });
        }

        res.status(200).json({
          success: true,
          message: result.message,
          keteranganDomisili: result.keteranganDomisili,
        });
      }
    );
  } catch (error) {
    console.error("❌ Unexpected Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan yang tidak terduga pada server.",
    });
  }
};

exports.deleteKeteranganDomisili = async (req, res) => {
  try {
    const { nomor_surat } = req.body;

    if (!nomor_surat) {
      return res.status(400).json({
        success: false,
        message: "Nomor surat diperlukan untuk menghapus keterangan domisili.",
      });
    }

    KeteranganDomisiliModel.deleteKeteranganDomisili(
      nomor_surat,
      (err, result) => {
        if (err) {
          console.error("❌ Server Error:", err.message);
          return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server.",
          });
        }

        if (!result.success) {
          return res.status(404).json({
            success: false,
            message: result.message,
          });
        }

        res.status(200).json({
          success: true,
          message: result.message,
        });
      }
    );
  } catch (error) {
    console.error("❌ Unexpected Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan yang tidak terduga pada server.",
    });
  }
};
