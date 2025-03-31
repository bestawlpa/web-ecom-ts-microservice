import express, { Router } from 'express'
import userController from '../controller/userController'
import authenticateToken from '../middleware/authenticateToken';

const router: Router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/register', userController.createUser);
router.post('/login', userController.getUserForLogin)
router.get('/profile', authenticateToken, userController.getUserProfile)

export default router;