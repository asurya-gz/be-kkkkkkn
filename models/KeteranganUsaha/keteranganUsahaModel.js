const db = require("../../db");

const KeteranganUsahaModel = {
  getAllKeteranganUsaha: async (callback) => {
    try {
      // Query untuk mengambil semua data keterangan usaha
      const [keteranganUsaha] = await db.query("SELECT * FROM keteranganusaha");

      // Jika tidak ada data, kembalikan array kosong
      if (keteranganUsaha.length === 0) {
        console.log("ℹ️ Info: Tidak ada data keterangan usaha ditemukan");
        return callback(null, {
          success: true,
          keteranganUsaha: [],
          message: "Tidak ada data keterangan usaha ditemukan",
        });
      }

      // Jika ada data, kembalikan data keterangan usaha
      callback(null, {
        success: true,
        keteranganUsaha,
        message: "Data keterangan usaha berhasil ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  createKeteranganUsaha: async (usahaData, callback) => {
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
      } = usahaData;

      // Pastikan nomor surat unik sebelum menyimpan
      const [existing] = await db.query(
        "SELECT nomor_surat FROM keteranganusaha WHERE nomor_surat = ?",
        [nomor_surat]
      );
      if (existing.length > 0) {
        return callback(null, {
          success: false,
          message: "Nomor surat sudah terdaftar",
        });
      }

      // Query untuk menyimpan data keterangan usaha baru
      await db.query(
        `INSERT INTO keteranganusaha (
          nomor_surat, nama, tempat_lahir, tanggal_lahir, pekerjaan,
          tempat_tinggal, surat_bukti_diri, jenis_usaha, status,
          lama_usaha, alamat_usaha, kepala_desa
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
      );

      callback(null, {
        success: true,
        message: "Keterangan usaha berhasil dibuat",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  getKeteranganUsahaByNomor: async (nomorSurat, callback) => {
    try {
      // Query untuk mencari keterangan usaha berdasarkan nomor surat
      const [usaha] = await db.query(
        "SELECT * FROM keteranganusaha WHERE nomor_surat = ?",
        [nomorSurat]
      );

      if (usaha.length === 0) {
        return callback(null, {
          success: false,
          message: "Keterangan usaha tidak ditemukan",
        });
      }

      callback(null, {
        success: true,
        keteranganUsaha: usaha[0],
        message: "Keterangan usaha ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  deleteKeteranganUsaha: async (nomorSurat, callback) => {
    try {
      // Periksa apakah nomor surat tersedia di database
      const [existing] = await db.query(
        "SELECT * FROM keteranganusaha WHERE nomor_surat = ?",
        [nomorSurat]
      );

      if (existing.length === 0) {
        return callback(null, {
          success: false,
          message: "Keterangan usaha tidak ditemukan",
        });
      }

      // Hapus keterangan usaha berdasarkan nomor surat
      await db.query("DELETE FROM keteranganusaha WHERE nomor_surat = ?", [
        nomorSurat,
      ]);

      callback(null, {
        success: true,
        message: "Keterangan usaha berhasil dihapus",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },
};

module.exports = KeteranganUsahaModel;
