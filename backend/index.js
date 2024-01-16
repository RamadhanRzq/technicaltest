import express from "express";
import cors from "cors";
import { createPool } from "mysql2";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "datakaryawan",
}).promise();

const secretKey =
  "11c7140c77f78d79d21a34ff7e882b4c0b04a34005be930bc99e8f894f8f1d5e";

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const [rows] = await db.query(
      "SELECT * FROM login WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: rows[0].id, email: rows[0].email },
      secretKey,
      { expiresIn: "1h" }
    );

    const user = {
      id: rows[0].id,
      email: rows[0].email,
      password: rows[0].password,
      roles: rows[0].roles,
    };

    res.json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    console.error("Error validating login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password, roles } = req.body;
    const [existingUsers] = await db.query(
      "SELECT * FROM login WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Email is already registered" });
    }
    const insertResult = await db.query(
      "INSERT INTO login (email, password, roles) VALUES (?, ?, ?)",
      [email, password, roles]
    );

    res.json({
      success: true,
      message: "Data inserted successfully",
      insertId: insertResult[0].insertId,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM login");
    res.json({ users: rows });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const [rows] = await db.query("SELECT * FROM login WHERE id = ?", [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: rows[0] });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/biodata", (req, res) => {
  const {
    posisi,
    nama,
    no_ktp,
    tempat_tgl_lahir,
    jenis_kelamin,
    agama,
    golongan_darah,
    status,
    alamat_ktp,
    alamat_tinggal,
    email,
    no_telp,
    orang_terdekat,
    skill,
    penempatan_bebas,
    penghasilan_diharapkan,
  } = req.body;

  const query = `
    INSERT INTO biodata (
      posisi,
      nama,
      no_ktp,
      tempat_tgl_lahir,
      jenis_kelamin,
      agama,
      golongan_darah,
      status,
      alamat_ktp,
      alamat_tinggal,
      email,
      no_telp,
      orang_terdekat,
      skill,
      penempatan_bebas,
      penghasilan_diharapkan
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    posisi,
    nama,
    no_ktp,
    tempat_tgl_lahir,
    jenis_kelamin,
    agama,
    golongan_darah,
    status,
    alamat_ktp,
    alamat_tinggal,
    email,
    no_telp,
    orang_terdekat,
    skill,
    penempatan_bebas,
    penghasilan_diharapkan,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data inserted successfully");
      res.status(201).send("Data inserted successfully");
    }
  });
});

app.get("/api/biodata", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM biodata");
    console.log("Data retrieved successfully");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/biodata/:email", async (req, res) => {
  try {
    const userId = req.params.email;
    const [rows] = await db.query("SELECT * FROM biodata WHERE email = ?", [
      userId,
    ]);
    console.log("Data retrieved successfully");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.patch("/api/biodata/:email", (req, res) => {
  const email = req.params.email;

  const {
    posisi,
    nama,
    no_ktp,
    tempat_tgl_lahir,
    jenis_kelamin,
    agama,
    golongan_darah,
    status,
    alamat_ktp,
    alamat_tinggal,
    no_telp,
    orang_terdekat,
    skill,
    penempatan_bebas,
    penghasilan_diharapkan,
  } = req.body;

  const query = `
    UPDATE biodata
    SET
      posisi = ?,
      nama = ?,
      no_ktp = ?,
      tempat_tgl_lahir = ?,
      jenis_kelamin = ?,
      agama = ?,
      golongan_darah = ?,
      status = ?,
      alamat_ktp = ?,
      alamat_tinggal = ?,
      no_telp = ?,
      orang_terdekat = ?,
      skill = ?,
      penempatan_bebas = ?,
      penghasilan_diharapkan = ?
    WHERE email = ?
  `;

  const values = [
    posisi,
    nama,
    no_ktp,
    tempat_tgl_lahir,
    jenis_kelamin,
    agama,
    golongan_darah,
    status,
    alamat_ktp,
    alamat_tinggal,
    no_telp,
    orang_terdekat,
    skill,
    penempatan_bebas,
    penghasilan_diharapkan,
    email,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data updated successfully");
      res.status(200).send("Data updated successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Backend Running With Port : ${port}`);
});
