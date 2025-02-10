const KeteranganBelumMenikahModel = require("../../models/BelumMenikah/belumMenikahModel");

exports.getAllKeteranganBelumMenikah = async (req, res) => {
  try {
    KeteranganBelumMenikahModel.getAllKeteranganBelumMenikah((err, result) => {
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
        keteranganBelumMenikah: result.keteranganBelumMenikah,
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

exports.createKeteranganBelumMenikah = async (req, res) => {
  try {
    const {
      nomor_surat,
      nama,
      tempat_lahir,
      tanggal_lahir,
      kewarganegaraan,
      agama,
      pekerjaan,
      nomor_hp,
      alamat,
      keperluan,
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
      !kewarganegaraan ||
      !nomor_hp ||
      !keperluan ||
      !alamat ||
      !kepala_desa
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua kolom wajib harus diisi.",
      });
    }

    KeteranganBelumMenikahModel.createKeteranganBelumMenikah(
      {
        nomor_surat,
        nama,
        tempat_lahir,
        tanggal_lahir,
        kewarganegaraan,
        agama,
        pekerjaan,
        nomor_hp,
        alamat,
        keperluan,
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

exports.getKeteranganBelumMenikahByNomor = async (req, res) => {
  try {
    const { nomor_surat } = req.body;

    if (!nomor_surat) {
      return res.status(400).json({
        success: false,
        message: "Nomor surat diperlukan.",
      });
    }

    KeteranganBelumMenikahModel.getKeteranganBelumMenikahByNomor(
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
          keteranganBelumMenikah: result.keteranganBelumMenikah,
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

exports.deleteKeteranganBelumMenikah = async (req, res) => {
  try {
    const { nomor_surat } = req.body;

    if (!nomor_surat) {
      return res.status(400).json({
        success: false,
        message:
          "Nomor surat diperlukan untuk menghapus keterangan belum menikah.",
      });
    }

    KeteranganBelumMenikahModel.deleteKeteranganBelumMenikah(
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
