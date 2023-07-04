// src/services/UserService.ts

import { UserRepository } from '../repository/user.repository';
import { Users } from '../entity/user.entity';



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

  async getUserById(id: string): Promise<Users[] | undefined> {
    try{

      const user = await this.userRepository.findById(id);
      return user;
    }catch(err){
      console.log('Error retrieving user:', err);
      throw err;
    }
  }

  async createUser(id:string,name: string, email: string,password:string): Promise<Users> {
    try{

      const user =await this.userRepository.createUser({ id,name, email,password });
      return user;
    }catch(err){
      console.log('ll')
      console.log('Error creating user:', err);
      throw err;
    }
  }

  async updateUserById(id: string, name: string, email: string,password:string): Promise<Users[] | undefined> {
    try{
      const updatedUser = await this.userRepository.updateUserById(id, { name, email,password });
      return updatedUser;
    }catch(err){
      console.log('Error updating user',err);
      throw err;
    }
  }

  async deleteUserById(id: string): Promise<void> {
    try{

      return await this.userRepository.delete(id);
    }catch(err){
      console.log('Error deleting user',err);
      throw err;
    }
  }
}
