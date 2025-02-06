const PendudukModel = require("../../models/Penduduk/pendudukModel");

exports.getAllPenduduk = async (req, res) => {
  try {
    PendudukModel.getAllPenduduk((err, result) => {
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
      if (result.penduduk.length === 0) {
        console.log("ℹ️ Info: Data penduduk kosong");
        return res.status(200).json({
          success: true,
          message: "Data penduduk kosong.",
          penduduk: [],
        });
      }

      // Sukses dengan data
      console.log("✅ Success: Data penduduk ditemukan");
      res.status(200).json({
        success: true,
        message: "Berhasil mendapatkan daftar penduduk.",
        penduduk: result.penduduk,
      });
    });
  } catch (error) {
    // Penanganan error tidak terduga
    console.error("❌ Unexpected Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan yang tidak terduga pada server.",
    });
  }
};

exports.registerPenduduk = async (req, res) => {
  try {
    const {
      nik,
      nama,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      alamat,
      desa_kelurahan,
      kecamatan,
      kabupaten_kota,
      provinsi,
      status_perkawinan,
      pekerjaan,
      agama,
    } = req.body;

    // Validasi input
    if (
      !nik ||
      !nama ||
      !tempat_lahir ||
      !tanggal_lahir ||
      !jenis_kelamin ||
      !alamat ||
      !desa_kelurahan ||
      !kecamatan ||
      !kabupaten_kota ||
      !provinsi ||
      !status_perkawinan ||
      !pekerjaan ||
      !agama
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua kolom harus diisi.",
      });
    }

    // Panggil model untuk menyimpan data
    PendudukModel.registerPenduduk(
      {
        nik,
        nama,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        alamat,
        desa_kelurahan,
        kecamatan,
        kabupaten_kota,
        provinsi,
        status_perkawinan,
        pekerjaan,
        agama,
      },
      (err, result) => {
        if (err) {
          console.error("❌ Server Error:", err.message);
          return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server.",
          });
        }

        res.status(201).json({
          success: true,
          message: "Penduduk berhasil didaftarkan.",
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

exports.deletePenduduk = async (req, res) => {
  try {
    const { nik } = req.body;

    // Add this debug line
    console.log("PendudukModel:", PendudukModel);

    // Validasi input
    if (!nik) {
      return res.status(400).json({
        success: false,
        message: "NIK diperlukan untuk menghapus data penduduk.",
      });
    }

    // Panggil model untuk menghapus penduduk
    PendudukModel.deletePenduduk(nik, (err, result) => {
      if (err) {
        console.error("❌ Server Error:", err.message);
        return res.status(500).json({
          success: false,
          message: "Terjadi kesalahan pada server.",
        });
      }

      // Jika penduduk tidak ditemukan
      if (!result.success) {
        return res.status(404).json({
          success: false,
          message: "Penduduk tidak ditemukan.",
        });
      }

      // Berhasil menghapus penduduk
      res.status(200).json({
        success: true,
        message: "Penduduk berhasil dihapus.",
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
