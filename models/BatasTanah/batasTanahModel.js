const db = require("../../db");

const BatastanahModel = {
  getAllBatastanah: async (callback) => {
    try {
      // Query untuk mengambil semua data batas tanah
      const [batastanah] = await db.query("SELECT * FROM batastanah");

      // Jika tidak ada data, kembalikan array kosong dengan success true
      if (batastanah.length === 0) {
        console.log("ℹ️ Info: Tidak ada data batas tanah ditemukan");
        return callback(null, {
          success: true,
          batastanah: [],
          message: "Tidak ada data batas tanah ditemukan",
        });
      }

      // Jika ada data, kembalikan data batas tanah
      callback(null, {
        success: true,
        batastanah,
        message: "Data batas tanah berhasil ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  createBatastanah: async (batasData, callback) => {
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
      } = batasData;

      // Pastikan nomor surat unik sebelum menyimpan
      const [existing] = await db.query(
        "SELECT nomor_surat FROM batastanah WHERE nomor_surat = ?",
        [nomor_surat]
      );
      if (existing.length > 0) {
        return callback(null, {
          success: false,
          message: "Nomor surat sudah terdaftar",
        });
      }

      // Query untuk menyimpan data batas tanah baru
      await db.query(
        `INSERT INTO batastanah (
          nomor_surat, nama, tempat_lahir, tanggal_lahir, kewarganegaraan,
          agama, pekerjaan, tempat_tinggal, surat_bukti_diri, keperluan,
          keterangan_lain_lain, kepala_desa, tujuan
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
      );

      callback(null, {
        success: true,
        message: "Batas tanah berhasil dibuat",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  getBatastanahByNomor: async (nomorSurat, callback) => {
    try {
      // Query untuk mencari batas tanah berdasarkan nomor surat
      const [batastanah] = await db.query(
        "SELECT * FROM batastanah WHERE nomor_surat = ?",
        [nomorSurat]
      );

      if (batastanah.length === 0) {
        return callback(null, {
          success: false,
          message: "Batas tanah tidak ditemukan",
        });
      }

      callback(null, {
        success: true,
        batastanah: batastanah[0],
        message: "Batas tanah ditemukan",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },

  deleteBatastanah: async (nomorSurat, callback) => {
    try {
      // Periksa apakah nomor surat tersedia di database
      const [existing] = await db.query(
        "SELECT * FROM batastanah WHERE nomor_surat = ?",
        [nomorSurat]
      );

      if (existing.length === 0) {
        return callback(null, {
          success: false,
          message: "Batas tanah tidak ditemukan",
        });
      }

      // Hapus batas tanah berdasarkan nomor surat
      await db.query("DELETE FROM batastanah WHERE nomor_surat = ?", [
        nomorSurat,
      ]);

      callback(null, {
        success: true,
        message: "Batas tanah berhasil dihapus",
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      callback(error, null);
    }
  },
};

module.exports = BatastanahModel;
