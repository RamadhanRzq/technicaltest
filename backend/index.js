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
  database: "biodata",
}).promise();

const secretKey =
  "11c7140c77f78d79d21a34ff7e882b4c0b04a34005be930bc99e8f894f8f1d5e";

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const [rows] = await db.query(
      "SELECT * FROM login WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: rows[0].id, username: rows[0].username },
      secretKey,
      { expiresIn: "1h" }
    );

    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Error validating login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }
    const insertResult = await db.query(
      "INSERT INTO login (username, password) VALUES (?, ?)",
      [username, password]
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

app.get("/current-user", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    res.json({ user: decoded });
  });
});

app.get("/user", async (res) => {
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

app.get("/", (req, res) => {
  res.send("Halaman Utama");
});

app.listen(port, () => {
  console.log(`Backend Running With Port : ${port}`);
});