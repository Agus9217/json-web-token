import { Router } from "express";
import { createUser, getAllUsers, login, logout, profile } from "../controller/user.controller.js";
import { authRequired } from "../Middleware/validateToken.js";

const router = Router()

router
  .get('/findAll', getAllUsers)
  .get('/profile', authRequired, profile)
  .post('/register', createUser)
  .post('/login', login)
  .post('/logout', logout)





export default router