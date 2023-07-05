// src/controllers/UserController.ts

import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { sign } from 'jsonwebtoken';
import { jwtConfig } from '../../config';
import {v4 as uuidv4} from 'uuid'
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

export async function getUserByEmailAndPassword(req: Request, res: Response) {
  try{
    //const { id } = req.params;
    const {email,password} = req.body;
    const user = await userService.getUserByEmailandPassword(email,password);
    if(user && user.length>0)
      res.json(user);
    else
    res.status(404).json({error: 'No users found with that email and password'})
  }
  catch(err){
    res.status(500).json({error: 'Internal server error'})
  }
}

export async function createUser(req: Request, res: Response) {
  try{

    const { name, email,password } = req.body;
    if(email===undefined  || name===undefined || password===undefined){
      res.status(400).json({error: 'Name, Email and Password must be provided'});
      return;
    }
    const id = uuidv4();
    const user = await userService.createUser(id,name, email, password);
    if(user)
      res.status(201).json(user);
    else{
      res.status(400).json({error: 'Could not create User, user with this email already exists'})
    }
  }
  catch(err){
    res.status(500).json({error: 'Internal server error'})

  }
}

export async function updateNameByEmailAndPassword(req: Request, res: Response) {
  try{
    const { name, email,password } = req.body;
    const user = await userService.updateNameByEmailAndPassword( name, email,password);
    if(user && user.length>0)
    res.status(200).json(user);
    else
      res.status(404).json({error: 'Cannot update user, make sure user is valid'})
  }catch(err) {
    res.status(500).json({error: 'Internal server error'});
  }
}

export async function deleteUserByEmailAndPassword(req: Request, res: Response) {
  try{
    const {email,password} = req.body;
    const result = await userService.deleteUserByEmailAndPassword(email,password);
    if(result && result.length>0 && result!=null){
      res.status(200).json('Successfully deleted user with email ' + email);
    }
    else
      return res.status(404).json({error:"Cannot delete user. User does not exist"})
  }catch(err){
    console.log('Error deleting user',err);
    res.status(500).json({message: 'Internal server error'});
  }
}
export async function AuthenticateUser(req: Request, res: Response) {
  try {
    const {email,password} = req.body;
    //console.log(req)
    //console.log(id)
    const user = await userService.getUserByEmailandPassword(email,password);
    //console.log(user)
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
