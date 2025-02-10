const SKCKModel = require("../../models/Skck/SkckModel");

exports.getAllSKCK = async (req, res) => {
  try {
    SKCKModel.getAllSKCK((err, result) => {
      if (err) {
        console.error("❌ Server Error:", err.message);
        return res.status(500).json({
          success: false,
          message: "Terjadi kesalahan pada server.",
        });
      }

      if (result.skckList.length === 0) {
        return res.status(200).json({
          success: true,
          message: "Tidak ada data SKCK yang tersedia.",
          skckData: [], // Tetap mengembalikan array kosong
        });
      }

      res.status(200).json({
        success: true,
        message: result.message,
        skckData: result.skckList,
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

exports.createSKCK = async (req, res) => {
  try {
    const {
      nomor_surat,
      nama,
      tempat_lahir,
      tanggal_lahir,
      pekerjaan,
      alamat,
      nomor_ktp,
      nomor_kk,
      nomor_hp,
      email,
      keperluan,
      tujuan,
      masa_berlaku,
      keterangan,
      kepala_desa,
    } = req.body;

    // Validasi input
    if (
      !nomor_surat ||
      !nama ||
      !tempat_lahir ||
      !tanggal_lahir ||
      !nomor_ktp ||
      !nomor_kk ||
      !pekerjaan ||
      !nomor_hp ||
      !alamat ||
      !tujuan ||
      !email ||
      !keperluan ||
      !masa_berlaku ||
      !keterangan ||
      !kepala_desa
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua kolom wajib harus diisi.",
      });
    }

    SKCKModel.createSKCK(
      {
        nomor_surat,
        nama,
        tempat_lahir,
        tanggal_lahir,
        pekerjaan,
        alamat,
        nomor_ktp,
        nomor_kk,
        nomor_hp,
        email,
        keperluan,
        tujuan,
        masa_berlaku,
        keterangan,
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

exports.getSKCKByNomor = async (req, res) => {
  try {
    const { nomor_surat } = req.body;

    if (!nomor_surat) {
      return res.status(400).json({
        success: false,
        message: "Nomor surat diperlukan.",
      });
    }

    SKCKModel.getSKCKByNomor(nomor_surat, (err, result) => {
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
        skckData: result.skckData,
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

exports.deleteSKCK = async (req, res) => {
  try {
    const { nomor_surat } = req.body;

    if (!nomor_surat) {
      return res.status(400).json({
        success: false,
        message: "Nomor surat diperlukan untuk menghapus SKCK.",
      });
    }

    SKCKModel.deleteSKCK(nomor_surat, (err, result) => {
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
