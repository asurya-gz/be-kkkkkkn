const BatastanahModel = require("../../models/BatasTanah/batasTanahModel");

exports.getAllBatasTanah = async (req, res) => {
  try {
    BatastanahModel.getAllBatastanah((err, result) => {
      // Penanganan error dari database atau server
      if (err) {
        console.error("❌ Server Error:", err.message);
        return res.status(500).json({
          success: false,
          message: "Terjadi kesalahan pada server.",
        });
      }

      // Jika result tidak ada atau tidak success
      if (!result || !result.success) {
        console.error("❌ Invalid Result:", result);
        return res.status(500).json({
          success: false,
          message: "Terjadi kesalahan dalam memproses data.",
        });
      }

      // Jika data kosong
      if (result.batastanah.length === 0) {
        console.log("ℹ️ Info: Data batas tanah kosong");
        return res.status(200).json({
          success: true,
          message: "Data batas tanah kosong.",
          batastanah: [],
        });
      }

      // Sukses dengan data
      console.log("✅ Success: Data batas tanah ditemukan");
      res.status(200).json({
        success: true,
        message: "Berhasil mendapatkan daftar batas tanah.",
        batastanah: result.batastanah,
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

exports.createBatasTanah = async (req, res) => {
  try {
    const {
      nomor_surat,
      nama,
      tempat_lahir,
      tanggal_lahir,
      kewarganegaraan,
      agama,
      pekerjaan,
      tempat_tinggal,
      surat_bukti_diri,
      keperluan,
      keterangan_lain_lain,
      kepala_desa,
      tujuan,
    } = req.body;

    // Validasi input
    if (
      !nomor_surat ||
      !nama ||
      !tempat_lahir ||
      !tanggal_lahir ||
      !kewarganegaraan ||
      !agama ||
      !pekerjaan ||
      !tempat_tinggal ||
      !surat_bukti_diri ||
      !keperluan ||
      !kepala_desa ||
      !tujuan
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua kolom wajib harus diisi.",
      });
    }

    // Panggil model untuk menyimpan data
    BatastanahModel.createBatastanah(
      {
        nomor_surat,
        nama,
        tempat_lahir,
        tanggal_lahir,
        kewarganegaraan,
        agama,
        pekerjaan,
        tempat_tinggal,
        surat_bukti_diri,
        keperluan,
        keterangan_lain_lain,
        kepala_desa,
        tujuan,
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
          return res.status(400).json(result);
        }

        res.status(201).json({
          success: true,
          message: "Surat batas tanah berhasil dibuat.",
          data: result,
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

exports.getBatasTanahByNomor = async (req, res) => {
  try {
    const { nomor_surat } = req.body;

    if (!nomor_surat) {
      return res.status(400).json({
        success: false,
        message: "Nomor surat diperlukan.",
      });
    }

    BatastanahModel.getBatastanahByNomor(nomor_surat, (err, result) => {
      if (err) {
        console.error("❌ Server Error:", err.message);
        return res.status(500).json({
          success: false,
          message: "Terjadi kesalahan pada server.",
        });
      }

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.status(200).json({
        success: true,
        message: "Surat batas tanah ditemukan.",
        batastanah: result.batastanah,
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

exports.deleteBatasTanah = async (req, res) => {
  try {
    const { nomor_surat } = req.body;

    // Validasi input
    if (!nomor_surat) {
      return res.status(400).json({
        success: false,
        message: "Nomor surat diperlukan untuk menghapus surat batas tanah.",
      });
    }

    // Panggil model untuk menghapus surat batas tanah
    BatastanahModel.deleteBatastanah(nomor_surat, (err, result) => {
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
          message: "Surat batas tanah tidak ditemukan.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Surat batas tanah berhasil dihapus.",
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

exports.updateBatasTanah = async (req, res) => {
  try {
    const { nomor_surat } = req.params;
    const updateData = req.body;

    if (!nomor_surat) {
      return res.status(400).json({
        success: false,
        message: "Nomor surat diperlukan untuk memperbarui surat batas tanah.",
      });
    }

    // Validasi field yang wajib diisi
    const requiredFields = [
      "nama",
      "tempat_lahir",
      "tanggal_lahir",
      "kewarganegaraan",
      "agama",
      "pekerjaan",
      "tempat_tinggal",
      "surat_bukti_diri",
      "keperluan",
      "kepala_desa",
    ];

    const missingFields = requiredFields.filter((field) => !updateData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Semua kolom wajib harus diisi.",
        missingFields,
      });
    }

    BatastanahModel.updateBatastanah(nomor_surat, updateData, (err, result) => {
      if (err) {
        console.error("❌ Server Error:", err.message);
        return res.status(500).json({
          success: false,
          message: "Terjadi kesalahan pada server.",
        });
      }

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.status(200).json({
        success: true,
        message: "Surat batas tanah berhasil diperbarui.",
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
