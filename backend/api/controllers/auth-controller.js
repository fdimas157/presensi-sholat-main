import argon2 from "argon2";
import { pool } from "../config/db.js";

// daftar akun
export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await argon2.hash(password);
    const result = await pool.query(
      "insert into users (username, password) values ($1, $2) returning *",
      [username, hashedPassword]
    );
    res.status(200).json({ msg: "Data tersimpan", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// login akun
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (!result.rows[0]) {
      return res.status(200).json({ error: "User tidak ditemukan !!!" });
    } else {
      // Verifikasi password
      const isPasswordValid = await argon2.verify(
        result.rows[0].password,
        password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Password salah" });
      } else {
        const token = jwt.sign(result.rows[0], process.env.SECRET_KEY);
        res.cookie("token", token, {
          httpOnly: true,
        });
        res.status(200).json({
          message: "Login successful",
          token,
          user: result.rows[0],
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

// logout akun
export const logout = async (_req, res) => {
  await res.setHeader("Cache-Control", "no-store");
  await res.clearCookie("token");
  res.status(200).json({ msg: "Logout berhasil" });
};

// untuk mengambil data akun yang sedang login
export const getDataLogin = async (req, res) => {
  try {
    return res.json({
      status: "Berhasil",
      data: `${req.user.username} sedang login`,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during login" });
  }
};
