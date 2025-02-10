const SuratCutiModel = require("../../models/SuratCuti/suratCutiModel");

exports.getAllSuratCuti = async (req, res) => {
  try {
    SuratCutiModel.getAllSuratCuti((err, result) => {
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
      if (result.suratCuti.length === 0) {
        console.log("ℹ️ Info: Data surat cuti kosong");
        return res.status(200).json({
          success: true,
          message: "Data surat cuti kosong.",
          suratCuti: [],
        });
      }

      // Sukses dengan data
      console.log("✅ Success: Data surat cuti ditemukan");
      res.status(200).json({
        success: true,
        message: "Berhasil mendapatkan daftar surat cuti.",
        suratCuti: result.suratCuti,
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

exports.createSuratCuti = async (req, res) => {
  try {
    const {
      no_surat,
      nama,
      tempat_lahir,
      tanggal_lahir,
      kewarganegaraan,
      agama,
      pekerjaan,
      nama_perusahaan,
      nomor_induk,
      bagian,
      alamat,
      surat_bukti,
      keperluan,
      kepala_desa,
    } = req.body;

    // Validasi input
    if (
      !no_surat ||
      !nama ||
      !tempat_lahir ||
      !tanggal_lahir ||
      !kewarganegaraan ||
      !agama ||
      !pekerjaan ||
      !nama_perusahaan ||
      !bagian ||
      !alamat ||
      !surat_bukti ||
      !keperluan ||
      !kepala_desa
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua kolom wajib harus diisi.",
      });
    }

    // Panggil model untuk menyimpan data
    SuratCutiModel.createSuratCuti(
      {
        no_surat,
        nama,
        tempat_lahir,
        tanggal_lahir,
        kewarganegaraan,
        agama,
        pekerjaan,
        nama_perusahaan,
        nomor_induk,
        bagian,
        alamat,
        surat_bukti,
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
          return res.status(400).json(result);
        }

        res.status(201).json({
          success: true,
          message: "Surat cuti berhasil dibuat.",
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

exports.getSuratCutiByNomor = async (req, res) => {
  try {
    const { no_surat } = req.body;

    if (!no_surat) {
      return res.status(400).json({
        success: false,
        message: "Nomor surat diperlukan.",
      });
    }

    SuratCutiModel.getSuratCutiByNomor(no_surat, (err, result) => {
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
        message: "Surat cuti ditemukan.",
        suratCuti: result.suratCuti,
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

exports.deleteSuratCuti = async (req, res) => {
  try {
    const { no_surat } = req.body;

    // Validasi input
    if (!no_surat) {
      return res.status(400).json({
        success: false,
        message: "Nomor surat diperlukan untuk menghapus surat cuti.",
      });
    }

    // Panggil model untuk menghapus surat cuti
    SuratCutiModel.deleteSuratCuti(no_surat, (err, result) => {
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
          message: "Surat cuti tidak ditemukan.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Surat cuti berhasil dihapus.",
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

exports.updateSuratCuti = async (req, res) => {
  try {
    const { no_surat } = req.params;
    const updateData = req.body;

    if (!no_surat) {
      return res.status(400).json({
        success: false,
        message: "Nomor surat diperlukan untuk memperbarui surat cuti.",
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
      "nama_perusahaan",
      "bagian",
      "alamat",
      "surat_bukti",
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

    SuratCutiModel.updateSuratCuti(no_surat, updateData, (err, result) => {
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
        message: "Surat cuti berhasil diperbarui.",
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
