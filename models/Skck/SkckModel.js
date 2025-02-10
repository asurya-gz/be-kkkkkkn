const db = require("../../db");

const SKCKModel = {
  getAllSKCK: async (callback) => {
    try {
      const [skckList] = await db.query("SELECT * FROM skck");

      if (skckList.length === 0) {
        console.log("ℹ️ Info: Tidak ada data SKCK ditemukan");
        return callback(null, {
          success: true,
          skckList: [],
          message: "Tidak ada data SKCK ditemukan",
        });
      }

      callback(null, {
        success: true,
        skckList,
        message: "Data SKCK berhasil ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  createSKCK: async (skckData, callback) => {
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
      } = skckData;

      // Pastikan nomor surat unik sebelum menyimpan
      const [existing] = await db.query(
        "SELECT nomor_surat FROM skck WHERE nomor_surat = ?",
        [nomor_surat]
      );
      if (existing.length > 0) {
        return callback(null, {
          success: false,
          message: "Nomor surat sudah terdaftar",
        });
      }

      // Query untuk menyimpan data SKCK baru
      await db.query(
        `INSERT INTO skck (
          nomor_surat, nama, tempat_lahir, tanggal_lahir, pekerjaan, alamat,
          nomor_ktp, nomor_kk, nomor_hp, email, keperluan, tujuan,
          masa_berlaku, keterangan, kepala_desa
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
      );

      callback(null, {
        success: true,
        message: "SKCK berhasil dibuat",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  getSKCKByNomor: async (nomorSurat, callback) => {
    try {
      const [skckData] = await db.query(
        "SELECT * FROM skck WHERE nomor_surat = ?",
        [nomorSurat]
      );

      if (skckData.length === 0) {
        return callback(null, {
          success: false,
          message: "Data SKCK tidak ditemukan",
        });
      }

      callback(null, {
        success: true,
        skckData: skckData[0],
        message: "Data SKCK ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  deleteSKCK: async (nomorSurat, callback) => {
    try {
      const [existing] = await db.query(
        "SELECT * FROM skck WHERE nomor_surat = ?",
        [nomorSurat]
      );

      if (existing.length === 0) {
        return callback(null, {
          success: false,
          message: "Data SKCK tidak ditemukan",
        });
      }

      await db.query("DELETE FROM skck WHERE nomor_surat = ?", [nomorSurat]);

      callback(null, {
        success: true,
        message: "Data SKCK berhasil dihapus",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },
};

module.exports = SKCKModel;
