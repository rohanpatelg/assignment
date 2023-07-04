// src/controllers/UserController.ts

import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { sign } from 'jsonwebtoken';
import { jwtConfig } from '../../config';
const userService = new UserService();

// Controller functions for handling requests
export async function getUsers(req: Request, res: Response) {
  const users = await userService.getAllUsers();
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  res.json(user);
}

export async function createUser(req: Request, res: Response) {
  const { name, email } = req.body;
  const user = await userService.createUser(name, email);
  res.status(201).json(user);
}

export async function updateUserById(req: Request, res: Response) {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await userService.updateUserById(id, name, email);
  res.json(user);
}

export async function deleteUserById(req: Request, res: Response) {
  const { id } = req.params;
  await userService.deleteUserById(id);
  res.sendStatus(204);
}
export async function AuthenticateUser(req: Request, res: Response) {
  try {
    console.log('first')
    const {id}  = req.query;
    console.log(req)
    console.log(id)
    const user = await userService.getUserById(id as string);
    console.log(user)
    if (user) {
      const token = sign(
        { id: user[0].id, email: user[0].email },
        jwtConfig.secretKey,
        {
          expiresIn: jwtConfig.expiresIn,
        }
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
