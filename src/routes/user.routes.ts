// src/routes/userRoutes.ts

import express, { Router } from 'express';
import { getUsers, getUserByEmailAndPassword, createUser, updateNameByEmailAndPassword, deleteUserByEmailAndPassword,AuthenticateUser } from '../controller/user.controller';
import { authenticateToken } from '../middleware/auth';
const router: Router = express.Router();
router.all('/login',AuthenticateUser);
router.get('/users',authenticateToken, getUsers);
router.get('/user',authenticateToken, getUserByEmailAndPassword);
router.post('/users',authenticateToken, createUser);
router.put('/users',authenticateToken, updateNameByEmailAndPassword);
router.delete('/users',authenticateToken, deleteUserByEmailAndPassword);
router.get('/',(req,res)=>{
    res.json({msg:'sdsds'});
})
export default router;
