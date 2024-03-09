import express from "express";
import {
  register,
  login,
  logout,
  getDataLogin,
} from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/regist", register);
router.post("/login", login);
router.post("/get-data-login", getDataLogin);
router.post("/logout", logout);

export default router;
