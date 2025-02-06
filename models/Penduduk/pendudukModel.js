const db = require("../../db");

const PendudukModel = {
  getAllPenduduk: async (callback) => {
    try {
      // Query untuk mengambil semua data penduduk
      const [penduduk] = await db.query("SELECT * FROM penduduk");

      // Jika tidak ada data, kembalikan array kosong dengan success true
      if (penduduk.length === 0) {
        console.log("ℹ️ Info: Tidak ada data penduduk ditemukan");
        return callback(null, {
          success: true,
          penduduk: [],
          message: "Tidak ada data penduduk ditemukan",
        });
      }

      // Jika ada data, kembalikan data penduduk
      callback(null, {
        success: true,
        penduduk,
        message: "Data penduduk berhasil ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  registerPenduduk: async (pendudukData, callback) => {
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
      } = pendudukData;

      // Pastikan NIK unik sebelum menyimpan
      const [existing] = await db.query(
        "SELECT nik FROM penduduk WHERE nik = ?",
        [nik]
      );
      if (existing.length > 0) {
        return callback(null, {
          success: false,
          message: "NIK sudah terdaftar",
        });
      }

      // Query untuk menyimpan data penduduk baru
      await db.query(
        `INSERT INTO penduduk (
          nik, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat,
          desa_kelurahan, kecamatan, kabupaten_kota, provinsi,
          status_perkawinan, pekerjaan, agama
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
      );

      callback(null, {
        success: true,
        message: "Registrasi penduduk berhasil",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  deletePenduduk: async (nik, callback) => {
    try {
      // Periksa apakah NIK tersedia di database
      const [existing] = await db.query("SELECT * FROM penduduk WHERE nik = ?", [nik]);
      
      if (existing.length === 0) {
        return callback(null, {
          success: false,
          message: "Penduduk dengan NIK tersebut tidak ditemukan",
        });
      }

      // Hapus data penduduk berdasarkan NIK
      await db.query("DELETE FROM penduduk WHERE nik = ?", [nik]);
      
      callback(null, {
        success: true,
        message: "Data penduduk berhasil dihapus",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },
};

module.exports = PendudukModel;
