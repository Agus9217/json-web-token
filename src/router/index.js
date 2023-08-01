import { Router } from "express";
import { createUser, getAllUsers, login, logout } from "../controller/user.controller.js";

const router = Router()

router
  .get('/findAll', getAllUsers)
  .post('/register', createUser)
  .post('/login', login)
  .post('/logout', logout)





export default router