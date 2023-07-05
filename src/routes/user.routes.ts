// src/routes/userRoutes.ts

import express, { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { authenticateToken } from '../middleware/auth';
const router: Router = express.Router();
const userController = new UserController();
router.all('/login',userController.AuthenticateUser);
router.get('/users', userController.getUsers);
router.get('/user',authenticateToken, userController.getUserByEmailAndPassword);
router.post('/users',authenticateToken, userController.createUser);
router.put('/users',authenticateToken, userController.updateNameByEmailAndPassword);
router.delete('/users',authenticateToken, userController.deleteUserByEmailAndPassword);
router.get('/',(req,res)=>{
    res.json({msg:'sdsds'});
})
export default router;
