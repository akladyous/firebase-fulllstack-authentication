import express from 'express';
export const authRoute = express.Router();
import { authController } from '../../controllers/loginController.js'

authRoute.post('/auth', authController)
