const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const userRoutes = require("./routes/Users/UsersRoutes");
const pendudukRoutes = require("./routes/Penduduk/pendudukRoutes");

// Opsi CORS untuk mengizinkan hanya localhost:3000
const corsOptions = {
  // origin: "https://perpus-undip.up.railway.app",
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Metode yang diizinkan
  credentials: true, // Izinkan cookies
  optionsSuccessStatus: 200, // Untuk beberapa versi lama browsers
};

// Middleware untuk mengizinkan CORS
app.use(cors(corsOptions));

// Middleware untuk parsing JSON
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", pendudukRoutes);

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
