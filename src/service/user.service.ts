// src/services/UserService.ts

import { UserRepository } from '../repository/user.repository';
import { Users } from '../entity/user.entity';
import {v4 as uuidv4} from 'uuid'

export class UserService {
  private userRepository: UserRepository;
  constructor(){
    this.userRepository = new UserRepository();
  }
  async getAllUsers(): Promise<Users[]> {
    try{

      const user = await this.userRepository.findAll();
      return user;
    }
    catch(err){
      console.log('Error retrieving user:', err);
      throw err;
    }
  }

  async getUserByEmail(email: string): Promise<Users[] | undefined> {
    try{

      const user = await this.userRepository.findByEmail(email);
      return user;
    }catch(err){
      console.log('Error retrieving user:', err);
      throw err;
    }
  }
  async getUserByEmailandPassword(email: string,password:string): Promise<Users[] | undefined> {
    try{

      const user = await this.userRepository.findByEmailandPassword(email,password);
      return user;
    }catch(err){
      console.log('Error retrieving user:', err);
      throw err;
    }
  }

  async createUser(id:string, name: string, email: string,password:string): Promise<Users> {
    try{
      const alreadyExistingUser = await this.userRepository.findByEmail(email);
      if(alreadyExistingUser && alreadyExistingUser.length>0){
        return null;
      }
      else{

        const user =await this.userRepository.createUser({id,name,email,password });
        return user;
      }
    }catch(err){
      console.log('Error creating user:', err);
      throw err;
    }
  }

  async updateNameByEmailAndPassword(name: string, email: string,password:string): Promise<Users[] | undefined> {
    try{
      const user = await this.userRepository.findByEmailandPassword(email,password);
      if(user && user.length>0){
        const updatedUser = await this.userRepository.updateNameByEmailAndPassword(email, { name, email,password });
        return updatedUser;
      }
      else{
        return null;
      }
    }catch(err){
      console.log('Error updating user',err);
      throw err;
    }
  }

  async deleteUserByEmailAndPassword(email: string,password:string): Promise<void|string> {
    try{
      const user = await this.userRepository.findByEmailandPassword(email,password);
      if(user && user.length>0){

       await this.userRepository.delete(email);
       return "Successfully deleted user with email: " + email;
      }
      else
        return null;
    }catch(err){
      console.log('Error deleting user',err);
      throw err;
    }
  }
}
