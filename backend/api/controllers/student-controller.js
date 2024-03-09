import { pool } from "../config/db.js";

// menampilkan semua data mahasiswa
export const getStudent = async (_req, res) => {
  try {
    const result = await pool.query("select * from students");
    res
      .status(200)
      .json({ msg: "Data berhasil ditampilkan", data: result.rows });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// menampilkan data mahasiswa berdasarkan ID
export const getStudentById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// menambah data mahasiswa baru
export const addNewStudent = async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO students (name, generation) VALUES ($1, $2) RETURNING *",
      [req.body.name, req.body.generation]
    );
    res.json({
      student: result.rows[0],
      message: "Mahasiswa berhasil ditambahkan.",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// mengubah data berdasarkan ID
export const updateStudent = async (req, res) => {
  try {
    await pool.query(
      "UPDATE students SET name = $1, generation = $2 WHERE id = $3",
      [req.body.name, req.body.generation, req.params.id]
    );
    res.status(200).json({
      message: "Mahasiswa berhasil ditambahkan.",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// mengubah kehadiran mahasiswa
export const setPresentById = async (req, res) => {
  try {
    await pool.query("UPDATE students SET present = $1 WHERE id = $2", [
      req.body.present,
      req.params.id,
    ]);
    res.json(
      req.body.present === true
        ? { msg: "Mahasiswa hadir" }
        : { msg: "Mahasiswa tidak hadir" }
    );
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// menghapus data mahasiswa
export const deleteStudent = async (req, res) => {
  try {
    await pool.query("DELETE FROM students WHERE id = $1", [req.params.id]);
    res.send("Mahasiswa berhasil dihapus.");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
