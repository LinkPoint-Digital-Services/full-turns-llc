import {register, login, forgotPassword, resetPassword, logout} from "../controllers/auth";
import {Router} from "express";

const router = Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout)

// forgot and reset routes
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword);

export default router;