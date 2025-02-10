const db = require("../../db");

const DomisiliUsahaModel = {
  getAllDomisiliUsaha: async (callback) => {
    try {
      // Query untuk mengambil semua data domisili usaha
      const [domisiliusaha] = await db.query("SELECT * FROM domisiliusaha");

      // Jika tidak ada data, kembalikan array kosong dengan success true
      if (domisiliusaha.length === 0) {
        console.log("ℹ️ Info: Tidak ada data domisili usaha ditemukan");
        return callback(null, {
          success: true,
          domisiliusaha: [],
          message: "Tidak ada data domisili usaha ditemukan",
        });
      }

      // Jika ada data, kembalikan data domisili usaha
      callback(null, {
        success: true,
        domisiliusaha,
        message: "Data domisili usaha berhasil ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  createDomisiliUsaha: async (usahaData, callback) => {
    try {
      const { nomor_surat, nama_perusahaan, alamat_perusahaan, kepala_desa } =
        usahaData;

      // Pastikan nomor surat unik sebelum menyimpan
      const [existing] = await db.query(
        "SELECT nomor_surat FROM domisiliusaha WHERE nomor_surat = ?",
        [nomor_surat]
      );
      if (existing.length > 0) {
        return callback(null, {
          success: false,
          message: "Nomor surat sudah terdaftar",
        });
      }

      // Query untuk menyimpan data domisili usaha baru
      await db.query(
        `INSERT INTO domisiliusaha (
          nomor_surat,
          nama_perusahaan, alamat_perusahaan, kepala_desa
        ) VALUES (?, ?, ?, ?)`,
        [nomor_surat, nama_perusahaan, alamat_perusahaan, kepala_desa]
      );

      callback(null, {
        success: true,
        message: "Domisili usaha berhasil dibuat",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  getDomisiliUsahaByNomor: async (nomorSurat, callback) => {
    try {
      // Query untuk mencari domisili usaha berdasarkan nomor surat
      const [domisiliusaha] = await db.query(
        "SELECT * FROM domisiliusaha WHERE nomor_surat = ?",
        [nomorSurat]
      );

      if (domisiliusaha.length === 0) {
        return callback(null, {
          success: false,
          message: "Domisili usaha tidak ditemukan",
        });
      }

      callback(null, {
        success: true,
        domisiliusaha: domisiliusaha[0],
        message: "Domisili usaha ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  deleteDomisiliUsaha: async (nomorSurat, callback) => {
    try {
      // Periksa apakah nomor surat tersedia di database
      const [existing] = await db.query(
        "SELECT * FROM domisiliusaha WHERE nomor_surat = ?",
        [nomorSurat]
      );

      if (existing.length === 0) {
        return callback(null, {
          success: false,
          message: "Domisili usaha tidak ditemukan",
        });
      }

      // Hapus domisili usaha berdasarkan nomor surat
      await db.query("DELETE FROM domisiliusaha WHERE nomor_surat = ?", [
        nomorSurat,
      ]);

      callback(null, {
        success: true,
        message: "Domisili usaha berhasil dihapus",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },
};

module.exports = DomisiliUsahaModel;
