import { Router } from "express";
import { createUser, getAllUsers } from "../controller/user.controller.js";

const router = Router()

router
  .get('/findAll', getAllUsers)
  .post('/create', createUser)





export default router