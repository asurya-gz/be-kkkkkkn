const db = require("../../db");

const SuratCutiModel = {
  getAllSuratCuti: async (callback) => {
    try {
      // Query untuk mengambil semua data surat cuti
      const [suratCuti] = await db.query("SELECT * FROM suratcutikerja");

      // Jika tidak ada data, kembalikan array kosong dengan success true
      if (suratCuti.length === 0) {
        console.log("ℹ️ Info: Tidak ada data surat cuti ditemukan");
        return callback(null, {
          success: true,
          suratCuti: [],
          message: "Tidak ada data surat cuti ditemukan",
        });
      }

      // Jika ada data, kembalikan data surat cuti
      callback(null, {
        success: true,
        suratCuti,
        message: "Data surat cuti berhasil ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  createSuratCuti: async (suratData, callback) => {
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
      } = suratData;

      // Pastikan nomor surat unik sebelum menyimpan
      const [existing] = await db.query(
        "SELECT no_surat FROM suratcutikerja WHERE no_surat = ?",
        [no_surat]
      );
      if (existing.length > 0) {
        return callback(null, {
          success: false,
          message: "Nomor surat sudah terdaftar",
        });
      }

      // Query untuk menyimpan data surat cuti baru
      await db.query(
        `INSERT INTO suratcutikerja (
          no_surat, nama, tempat_lahir, tanggal_lahir, kewarganegaraan,
          agama, pekerjaan, nama_perusahaan, nomor_induk, bagian,
          alamat, surat_bukti, keperluan, kepala_desa
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
      );

      callback(null, {
        success: true,
        message: "Surat cuti berhasil dibuat",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  getSuratCutiByNomor: async (noSurat, callback) => {
    try {
      // Query untuk mencari surat berdasarkan nomor surat
      const [suratCuti] = await db.query(
        "SELECT * FROM suratcutikerja WHERE no_surat = ?",
        [noSurat]
      );

      if (suratCuti.length === 0) {
        return callback(null, {
          success: false,
          message: "Surat cuti tidak ditemukan",
        });
      }

      callback(null, {
        success: true,
        suratCuti: suratCuti[0],
        message: "Surat cuti ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  deleteSuratCuti: async (noSurat, callback) => {
    try {
      // Periksa apakah nomor surat tersedia di database
      const [existing] = await db.query(
        "SELECT * FROM suratcutikerja WHERE no_surat = ?",
        [noSurat]
      );

      if (existing.length === 0) {
        return callback(null, {
          success: false,
          message: "Surat cuti tidak ditemukan",
        });
      }

      // Hapus surat cuti berdasarkan nomor surat
      await db.query("DELETE FROM suratcutikerja WHERE no_surat = ?", [
        noSurat,
      ]);

      callback(null, {
        success: true,
        message: "Surat cuti berhasil dihapus",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  updateSuratCuti: async (noSurat, suratData, callback) => {
    try {
      // Periksa apakah surat exists
      const [existing] = await db.query(
        "SELECT * FROM suratcutikerja WHERE no_surat = ?",
        [noSurat]
      );

      if (existing.length === 0) {
        return callback(null, {
          success: false,
          message: "Surat cuti tidak ditemukan",
        });
      }

      const {
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
      } = suratData;

      // Update surat cuti
      await db.query(
        `UPDATE suratcutikerja SET 
          nama = ?, tempat_lahir = ?, tanggal_lahir = ?, kewarganegaraan = ?,
          agama = ?, pekerjaan = ?, nama_perusahaan = ?, nomor_induk = ?, 
          bagian = ?, alamat = ?, surat_bukti = ?, keperluan = ?, kepala_desa = ?
        WHERE no_surat = ?`,
        [
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
          noSurat,
        ]
      );

      callback(null, {
        success: true,
        message: "Surat cuti berhasil diperbarui",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },
};

module.exports = SuratCutiModel;
