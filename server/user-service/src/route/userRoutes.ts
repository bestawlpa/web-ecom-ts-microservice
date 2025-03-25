import express, { Router } from 'express'
import userController from '../controller/userController'

const router: Router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/register', userController.createUser);

export default router;