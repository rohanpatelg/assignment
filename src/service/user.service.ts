// src/services/UserService.ts

import { UserRepository } from "../repository/user.repository";
import { Users } from "../entity/User.entity";

export class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  getAllUsers = async (): Promise<Users[]> => {
    try {
      const user = await this.userRepository.findAll();
      return user;
    } catch (err) {
      console.log("Error retrieving user:", err);
      throw err;
    }
  };

  getUserByEmail = async (email: string): Promise<Users[] | undefined> => {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user;
    } catch (err) {
      console.log("Error retrieving user:", err);
      throw err;
    }
  };
  getUserByEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<Users[] | undefined> => {
    try {
      console.log("first");
      const user = await this.userRepository.findByEmailAndPassword(
        email,
        password
      );
      console.log(user);
      return user;
    } catch (err) {
      console.log("PP");
      console.log("Error retrieving user:", err);
      throw err;
    }
  };

  createUser = async (
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<Users> => {
    try {
      const alreadyExistingUser = await this.userRepository.findByEmail(email);
      if (alreadyExistingUser && alreadyExistingUser.length > 0) {
        return null;
      } else {
        const user = await this.userRepository.createUser({
          id,
          name,
          email,
          password,
        });
        return user;
      }
    } catch (err) {
      console.log("Error creating user:", err);
      throw err;
    }
  };

  updateNameByEmailAndPassword = async (
    name: string,
    email: string,
    password: string
  ): Promise<Users[] | undefined> => {
    try {
      const user = await this.userRepository.findByEmailAndPassword(
        email,
        password
      );
      if (user && user.length > 0) {
        const updatedUser =
          await this.userRepository.updateNameByEmailAndPassword(email, {
            name,
            email,
            password,
          });
        return updatedUser;
      } else {
        return null;
      }
    } catch (err) {
      console.log("Error updating user", err);
      throw err;
    }
  };

  deleteUserByEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<void | string> => {
    try {
      const user = await this.userRepository.findByEmailAndPassword(
        email,
        password
      );
      if (user && user.length > 0) {
        await this.userRepository.delete(email);
        return "Successfully deleted user with email: " + email;
      } else return null;
    } catch (err) {
      console.log("Error deleting user", err);
      throw err;
    }
  };
}
