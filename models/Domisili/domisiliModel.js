const db = require("../../db");

const KeteranganDomisiliModel = {
  getAllKeteranganDomisili: async (callback) => {
    try {
      // Query untuk mengambil semua data keterangan domisili
      const [keteranganDomisili] = await db.query("SELECT * FROM domisili");

      // Jika tidak ada data, kembalikan array kosong
      if (keteranganDomisili.length === 0) {
        console.log("ℹ️ Info: Tidak ada data keterangan domisili ditemukan");
        return callback(null, {
          success: true,
          keteranganDomisili: [],
          message: "Tidak ada data keterangan domisili ditemukan",
        });
      }

      // Jika ada data, kembalikan data keterangan domisili
      callback(null, {
        success: true,
        keteranganDomisili,
        message: "Data keterangan domisili berhasil ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  createKeteranganDomisili: async (domisiliData, callback) => {
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
      } = domisiliData;

      // Pastikan nomor surat unik sebelum menyimpan
      const [existing] = await db.query(
        "SELECT nomor_surat FROM domisili WHERE nomor_surat = ?",
        [nomor_surat]
      );
      if (existing.length > 0) {
        return callback(null, {
          success: false,
          message: "Nomor surat sudah terdaftar",
        });
      }

      // Query untuk menyimpan data keterangan domisili baru
      await db.query(
        `INSERT INTO domisili (
          nomor_surat, nama, tempat_lahir, tanggal_lahir, bukti_diri,
          agama, pekerjaan, alamat, domisili, kepala_desa
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
      );

      callback(null, {
        success: true,
        message: "Keterangan domisili berhasil dibuat",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  getKeteranganDomisiliByNomor: async (nomorSurat, callback) => {
    try {
      // Query untuk mencari keterangan domisili berdasarkan nomor surat
      const [domisili] = await db.query(
        "SELECT * FROM domisili WHERE nomor_surat = ?",
        [nomorSurat]
      );

      if (domisili.length === 0) {
        return callback(null, {
          success: false,
          message: "Keterangan domisili tidak ditemukan",
        });
      }

      callback(null, {
        success: true,
        keteranganDomisili: domisili[0],
        message: "Keterangan domisili ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  deleteKeteranganDomisili: async (nomorSurat, callback) => {
    try {
      // Periksa apakah nomor surat tersedia di database
      const [existing] = await db.query(
        "SELECT * FROM domisili WHERE nomor_surat = ?",
        [nomorSurat]
      );

      if (existing.length === 0) {
        return callback(null, {
          success: false,
          message: "Keterangan domisili tidak ditemukan",
        });
      }

      // Hapus keterangan domisili berdasarkan nomor surat
      await db.query("DELETE FROM domisili WHERE nomor_surat = ?", [
        nomorSurat,
      ]);

      callback(null, {
        success: true,
        message: "Keterangan domisili berhasil dihapus",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },
};

module.exports = KeteranganDomisiliModel;
