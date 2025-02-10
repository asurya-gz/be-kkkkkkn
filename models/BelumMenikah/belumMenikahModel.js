const db = require("../../db");

const KeteranganBelumMenikahModel = {
  getAllKeteranganBelumMenikah: async (callback) => {
    try {
      const [keteranganBelumMenikah] = await db.query(
        "SELECT * FROM belummenikah"
      );

      if (keteranganBelumMenikah.length === 0) {
        console.log(
          "ℹ️ Info: Tidak ada data keterangan belum menikah ditemukan"
        );
        return callback(null, {
          success: true,
          keteranganBelumMenikah: [],
          message: "Tidak ada data keterangan belum menikah ditemukan",
        });
      }

      callback(null, {
        success: true,
        keteranganBelumMenikah,
        message: "Data keterangan belum menikah berhasil ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  createKeteranganBelumMenikah: async (belumMenikahData, callback) => {
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
      } = belumMenikahData;

      // Pastikan nomor surat unik sebelum menyimpan
      const [existing] = await db.query(
        "SELECT nomor_surat FROM belummenikah WHERE nomor_surat = ?",
        [nomor_surat]
      );
      if (existing.length > 0) {
        return callback(null, {
          success: false,
          message: "Nomor surat sudah terdaftar",
        });
      }

      // Query untuk menyimpan data keterangan belum menikah baru
      await db.query(
        `INSERT INTO belummenikah (
          nomor_surat, nama, tempat_lahir, tanggal_lahir, kewarganegaraan,
          agama, pekerjaan, nomor_hp, alamat, keperluan, kepala_desa
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
      );

      callback(null, {
        success: true,
        message: "Keterangan belum menikah berhasil dibuat",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  getKeteranganBelumMenikahByNomor: async (nomorSurat, callback) => {
    try {
      const [belumMenikah] = await db.query(
        "SELECT * FROM belummenikah WHERE nomor_surat = ?",
        [nomorSurat]
      );

      if (belumMenikah.length === 0) {
        return callback(null, {
          success: false,
          message: "Keterangan belum menikah tidak ditemukan",
        });
      }

      callback(null, {
        success: true,
        keteranganBelumMenikah: belumMenikah[0],
        message: "Keterangan belum menikah ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  deleteKeteranganBelumMenikah: async (nomorSurat, callback) => {
    try {
      const [existing] = await db.query(
        "SELECT * FROM belummenikah WHERE nomor_surat = ?",
        [nomorSurat]
      );

      if (existing.length === 0) {
        return callback(null, {
          success: false,
          message: "Keterangan belum menikah tidak ditemukan",
        });
      }

      await db.query("DELETE FROM belummenikah WHERE nomor_surat = ?", [
        nomorSurat,
      ]);

      callback(null, {
        success: true,
        message: "Keterangan belum menikah berhasil dihapus",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },
};

module.exports = KeteranganBelumMenikahModel;
