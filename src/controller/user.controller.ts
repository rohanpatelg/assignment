// src/controllers/UserController.ts

import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { sign } from 'jsonwebtoken';
import { jwtConfig } from '../../config';
const userService = new UserService();

// Controller functions for handling requests
export async function getUsers(req: Request, res: Response) {
  try{
    const users = await userService.getAllUsers();
    if(users && users.length > 0)
      res.json(users);
    else
      res.status(404).json({error: 'No users found'})
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'})
  }
}

export async function getUserById(req: Request, res: Response) {
  try{
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if(user && user.length>0)
      res.json(user);
    else
    res.status(404).json({error: 'No users found with that id'})
  }
  catch(err){
    res.status(500).json({error: 'Internal server error'})
  }
}

export async function createUser(req: Request, res: Response) {
  try{
    console.log('PP')
    const { id,name, email,password } = req.body;
    console.log(id,name,email,password);
    if(email===undefined || id===undefined || name===undefined || password===undefined){
      res.json({message: 'Id, Name, Email and Password must be provided'});
      return;
    }
    const user = await userService.createUser(id,name, email, password);
    if(user)
      res.status(201).json(user);
    else{
      res.json({error: 'Could not create User'})
    }
  }
  catch(err){
    res.status(500).json({error: 'Internal server error'})

  }
}

export async function updateUserById(req: Request, res: Response) {
  try{
    const { id } = req.params;
    const { name, email,password } = req.body;
    const user = await userService.updateUserById(id, name, email,password);
    if(user && user.length>0)
    res.json(user);
    else
      res.status(404).json({error: 'Cannot update user, make sure user is valid'})
  }catch(err) {
    res.status(500).json({error: 'Internal server error'});
  }
}

export async function deleteUserById(req: Request, res: Response) {
  try{
    const { id } = req.params;
    await userService.deleteUserById(id);
    res.json('Successfully deleted user with id ' + id);
  }catch(err){
    console.log('Error deleting user',err);
    res.status(500).json({message: 'Internal server error'});
  }
}
export async function AuthenticateUser(req: Request, res: Response) {
  try {
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
