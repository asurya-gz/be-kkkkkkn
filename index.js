const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const userRoutes = require("./routes/Users/UsersRoutes");
const suratCutiRoutes = require("./routes/SuratCuti/suratCutiRoutes");
const batasTanahRoutes = require("./routes/BatasTanah/batasTanahRoutes");
const keteranganUsahaRoutes = require("./routes/KeteranganUsaha/keteranganUsahaRoutes");
const domisiliUsahaRoutes = require("./routes/DomisiliUsaha/domisiliUsahaRoutes");
const domisiliRoutes = require("./routes/Domisili/domisiliRoutes");
const belumMenikahRoutes = require("./routes/BelumMenikah/belumMenikahRoutes");
const skskRoutes = require("./routes/Skck/skckRoutes");
const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

// Opsi CORS untuk mengizinkan hanya 147.93.111.133:3000
const corsOptions = {
  origin: "http://147.93.111.133:3000",
  // origin: "http://147.93.111.133:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Metode yang diizinkan
  credentials: true, // Izinkan cookies
  optionsSuccessStatus: 200, // Untuk beberapa versi lama browsers
};

// Middleware untuk mengizinkan CORS
app.use(cors(corsOptions));

// Middleware untuk parsing JSON
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", suratCutiRoutes);
app.use("/api", batasTanahRoutes);
app.use("/api", keteranganUsahaRoutes);
app.use("/api", domisiliUsahaRoutes);
app.use("/api", domisiliRoutes);
app.use("/api", belumMenikahRoutes);
app.use("/api", skskRoutes);

app.post("/api/generate-surat", (req, res) => {
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

    console.log("Data diterima:", req.body); // Cek data masuk

    const templatePath = path.resolve(__dirname, "public", "CutiKerja.docx");

    if (!fs.existsSync(templatePath)) {
      throw new Error("Template file tidak ditemukan.");
    }

    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      no_surat,
      nama,
      tempat_lahir,
      tanggal_lahir: new Date(tanggal_lahir).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      kewarganegaraan,
      agama,
      pekerjaan,
      nama_perusahaan,
      nomor_induk: nomor_induk || "-",
      bagian,
      alamat,
      surat_bukti,
      keperluan,
      kepala_desa,
      tanggal_hariini: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });

    const buf = doc.getZip().generate({ type: "nodebuffer" });

    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename=SuratCutiKerja_${nama}.docx`,
    });

    res.send(buf);
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat surat:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/generate-batastanah", (req, res) => {
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
    } = req.body;

    console.log("Data diterima:", req.body); // Cek data masuk

    const templatePath = path.resolve(__dirname, "public", "BatasTanah.docx");

    if (!fs.existsSync(templatePath)) {
      throw new Error("Template file tidak ditemukan.");
    }

    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      nomor_surat,
      nama,
      tempat_lahir,
      tanggal_lahir: new Date(tanggal_lahir).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      kewarganegaraan,
      agama,
      pekerjaan,
      tempat_tinggal,
      surat_bukti_diri,
      keperluan,
      keterangan_lain_lain,
      kepala_desa,
      tujuan,
      tanggal_hariini: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });

    const buf = doc.getZip().generate({ type: "nodebuffer" });

    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename=BatasTanah_${nama}.docx`,
    });

    res.send(buf);
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat surat:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/generate-keteranganusaha", (req, res) => {
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
    } = req.body;

    console.log("Data diterima:", req.body); // Cek data masuk

    const templatePath = path.resolve(
      __dirname,
      "public",
      "KeteranganUsaha.docx"
    );

    if (!fs.existsSync(templatePath)) {
      throw new Error("Template file tidak ditemukan.");
    }

    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      nomor_surat,
      nama,
      tempat_lahir,
      tanggal_lahir: new Date(tanggal_lahir).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      pekerjaan,
      tempat_tinggal,
      surat_bukti_diri,
      jenis_usaha,
      status,
      lama_usaha,
      alamat_usaha,
      kepala_desa,
      tanggal_hariini: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });

    const buf = doc.getZip().generate({ type: "nodebuffer" });

    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename=BatasTanah_${nama}.docx`,
    });

    res.send(buf);
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat surat:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/generate-domisiliusaha", (req, res) => {
  try {
    const { nomor_surat, nama_perusahaan, alamat_perusahaan, kepala_desa } =
      req.body;

    console.log("Data diterima:", req.body); // Cek data masuk

    const templatePath = path.resolve(
      __dirname,
      "public",
      "DomisiliUsaha.docx"
    );

    if (!fs.existsSync(templatePath)) {
      throw new Error("Template file tidak ditemukan.");
    }

    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      nomor_surat,
      nama_perusahaan,
      alamat_perusahaan,
      kepala_desa,
      tanggal_hariini: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });

    const buf = doc.getZip().generate({ type: "nodebuffer" });

    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename=Domisili_usaha${nama_perusahaan}.docx`,
    });

    res.send(buf);
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat surat:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/generate-domisili", (req, res) => {
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
    } = req.body;

    console.log("Data diterima:", req.body); // Cek data masuk

    const templatePath = path.resolve(__dirname, "public", "Domisili.docx");

    if (!fs.existsSync(templatePath)) {
      throw new Error("Template file tidak ditemukan.");
    }

    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      nomor_surat,
      nama,
      tempat_lahir,
      tanggal_lahir: new Date(tanggal_lahir).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      bukti_diri,
      agama,
      pekerjaan,
      alamat,
      domisili,
      kepala_desa,
      tanggal_hariini: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });

    const buf = doc.getZip().generate({ type: "nodebuffer" });

    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename=Domisili_${nama}.docx`,
    });

    res.send(buf);
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat surat:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/generate-belummenikah", (req, res) => {
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
    } = req.body;

    console.log("Data diterima:", req.body); // Cek data masuk

    const templatePath = path.resolve(__dirname, "public", "BelumMenikah.docx");

    if (!fs.existsSync(templatePath)) {
      throw new Error("Template file tidak ditemukan.");
    }

    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      nomor_surat,
      nama,
      tempat_lahir,
      tanggal_lahir: new Date(tanggal_lahir).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      kewarganegaraan,
      agama,
      pekerjaan,
      nomor_hp,
      alamat,
      keperluan,
      kepala_desa,
      tanggal_hariini: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });

    const buf = doc.getZip().generate({ type: "nodebuffer" });

    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename=BelumMenikah${nama}.docx`,
    });

    res.send(buf);
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat surat:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/generate-skck", (req, res) => {
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
    } = req.body;

    console.log("Data diterima:", req.body); // Cek data masuk

    const templatePath = path.resolve(
      __dirname,
      "public",
      "PengantarSkck.docx"
    );

    if (!fs.existsSync(templatePath)) {
      throw new Error("Template file tidak ditemukan.");
    }

    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      nomor_surat,
      nama,
      tempat_lahir,
      tanggal_lahir: new Date(tanggal_lahir).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
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
      tanggal_hariini: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });

    const buf = doc.getZip().generate({ type: "nodebuffer" });

    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename=PengantarSkck${nama}.docx`,
    });

    res.send(buf);
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat surat:", error);
    res.status(500).json({ error: error.message });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://147.93.111.133:${port}`);
});
