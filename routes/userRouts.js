import express from "express";
import { createUser,  deleteUser,  updateUser } from "../controller/userController.js";
import { login } from "../controller/userController.js";
import { admin, protect } from "../middleWare/authMidldleware.js";


const router = express.Router();

router.route("/create-user").post(protect, createUser);
router.route("/login").post(login);
router.route("/delete-user/:id").delete(protect, deleteUser);
router.route("/update-user/:id").put(protect, admin, updateUser);



export default router;