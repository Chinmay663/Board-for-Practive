import express from "express";
import {registerUser,loginUser,getUser} from "../controllers/usersControllers.js"
import protect from "../middleware/authMiddleware.js";

const router=express.Router();

router.post('/',registerUser);
router.post('/login',loginUser);
router.get('/me',protect ,getUser);

export default router;