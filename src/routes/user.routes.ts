// src/routes/userRoutes.ts

import express, { Router } from 'express';
import { getUsers, getUserById, createUser, updateUserById, deleteUserById,AuthenticateUser } from '../controller/user.controller';
import { authenticateToken } from '../middleware/auth';
const router: Router = express.Router();
router.all('/login',AuthenticateUser);
router.get('/users',authenticateToken, getUsers);
router.get('users/:id',authenticateToken, getUserById);
router.post('users',authenticateToken, createUser);
router.put('users/:id',authenticateToken, updateUserById);
router.delete('users/:id',authenticateToken, deleteUserById);

export default router;
