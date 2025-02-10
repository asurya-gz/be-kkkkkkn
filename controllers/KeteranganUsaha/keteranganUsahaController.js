const KeteranganUsahaModel = require("../../models/KeteranganUsaha/keteranganUsahaModel");

exports.getAllKeteranganUsaha = async (req, res) => {
  try {
    KeteranganUsahaModel.getAllKeteranganUsaha((err, result) => {
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
        keteranganUsaha: result.keteranganUsaha,
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

exports.createKeteranganUsaha = async (req, res) => {
  try {
    const {
      nomor_surat,
      nama,
      tempat_lahir,
      tanggal_lahir,
      pekerjaan,
      tempat_tinggal,
      surat_bukti_diri,
      jenis_usaha,
      status,
      lama_usaha,
      alamat_usaha,
      kepala_desa,
    } = req.body;

    // Validasi input
    if (
      !nomor_surat ||
      !nama ||
      !tempat_lahir ||
      !tanggal_lahir ||
      !pekerjaan ||
      !tempat_tinggal ||
      !surat_bukti_diri ||
      !jenis_usaha ||
      !status ||
      !lama_usaha ||
      !alamat_usaha ||
      !kepala_desa
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua kolom wajib harus diisi.",
      });
    }

    KeteranganUsahaModel.createKeteranganUsaha(
      {
        nomor_surat,
        nama,
        tempat_lahir,
        tanggal_lahir,
        pekerjaan,
        tempat_tinggal,
        surat_bukti_diri,
        jenis_usaha,
        status,
        lama_usaha,
        alamat_usaha,
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

exports.getKeteranganUsahaByNomor = async (req, res) => {
  try {
    const { nomor_surat } = req.body;

    if (!nomor_surat) {
      return res.status(400).json({
        success: false,
        message: "Nomor surat diperlukan.",
      });
    }

    KeteranganUsahaModel.getKeteranganUsahaByNomor(
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
          keteranganUsaha: result.keteranganUsaha,
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

exports.deleteKeteranganUsaha = async (req, res) => {
  try {
    const { nomor_surat } = req.body;

    if (!nomor_surat) {
      return res.status(400).json({
        success: false,
        message: "Nomor surat diperlukan untuk menghapus keterangan usaha.",
      });
    }

    KeteranganUsahaModel.deleteKeteranganUsaha(nomor_surat, (err, result) => {
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
    });
  } catch (error) {
    console.error("❌ Unexpected Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan yang tidak terduga pada server.",
    });
  }
};
