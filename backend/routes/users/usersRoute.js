import express from 'express';
export const usersRoute = express.Router();

import { loginController } from '../../controllers/auth/authController.js'
import { logoutController } from '../../controllers/auth/authController.js'
import { signupController } from '../../controllers/auth/authController.js'

usersRoute.post('/users/login', loginController)
usersRoute.delete('/users/logout', logoutController)
usersRoute.post('/users/signup', signupController)

