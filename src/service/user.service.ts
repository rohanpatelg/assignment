// src/services/UserService.ts

import { UsersRepository } from '../repository/user.repository';
import { Users } from '../entity/user.entity';

const userRepository = new UsersRepository();

export class UserService {
  async getAllUsers(): Promise<Users[]> {
    return userRepository.findAll();
  }

  async getUserById(id: string): Promise<Users[] | undefined> {
    return userRepository.findById(id);
  }

  async createUser(name: string, email: string): Promise<Users> {
    return userRepository.createUser({ name, email });
  }

  async updateUserById(id: string, name: string, email: string): Promise<Users[] | undefined> {
    return userRepository.updateUserById(id, { name, email });
  }

  async deleteUserById(id: string): Promise<void> {
    return userRepository.delete(id);
  }
}
