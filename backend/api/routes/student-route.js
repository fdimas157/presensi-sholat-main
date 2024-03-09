import express from "express";
import {
  getStudent,
  getStudentById,
  addNewStudent,
  updateStudent,
  deleteStudent,
  setPresentById,
} from "../controllers/student-controller.js";

const router = express.Router();

router.get("/get-all-student", getStudent);
router.get("/get-all-student-by-id", getStudentById);
router.get("/add-new-student", addNewStudent);
router.get("/update-student", updateStudent);
router.get("/delete-student", deleteStudent);
router.get("/set-present-student", setPresentById);

export default router;
