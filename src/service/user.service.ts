// src/services/UserService.ts

import { UserRepository } from '../repository/user.repository';
import { Users } from '../entity/user.entity';
import {injectable,inject} from 'tsyringe'
@injectable()
/**
 * Service for user-related operations.
 */
export class UserService {
  private userRepository: UserRepository;

   /**
   * Initializes the repository
   */
  constructor(@inject(UserRepository) userRepository: UserRepository) {
   this.userRepository = userRepository;
  }
  getAllUsers = async (): Promise<Users[]> => {
    try {
      const user = await this.userRepository.findAll();
      return user;
    } catch (err) {
      console.log('Error retrieving user:', err);
      throw err;
    }
  };

  /**
   * Get a user by name.
   * @param {string} name - The name of the user.
   * @returns {Users[]} The user object.
   */
  getUsersByName=async(name: string): Promise<Users[]>=>{
    try{
      const users = name && await this.userRepository.findByName(name);
      return users;
    }catch (err) {
      console.log('Error retrieving user:', err);
      throw err;
    }
  }

  /**
   * Get a user by Email.
   * @param {string} email - The email of the user.
   * @returns {Users} The user object.
   */

  getUserByEmail = async (email: string): Promise<Users> => {
    try {
      const user = email&&await this.userRepository.findByEmail(email);
      return user[0];
    } catch (err) {
      console.log('Error retrieving user:', err);
      throw err;
    }
  };
  /**
   * 
   * Get a user by Email and Password.
   * @param {string} id - The ID of the user.
   * @returns {Users} The user object.
   * 
   */
  getUserByEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<Users> => {
    try {
      const user =email&&password&& await this.userRepository.findByEmailAndPassword(
        email,
        password
      );
      return user[0];
    } catch (err) {
      console.log('Error retrieving user:', err);
      throw err;
    }
  };

  /**
   * 
   * Create a new user.
   * @param {id} id - The id generated vis uuidv4. Primary key.
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Users} The created user object.
   * 
   */
  createUser = async (
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<Users> => {
    try {
      const alreadyExistingUser =email&& await this.userRepository.findByEmail(email);
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
      console.log('Error creating user:', err);
      throw err;
    }
  };

  /**
   * Update a user's details.
   * @param {string} password - The password of the user.
   * @param {string} name - The new name of the user.
   * @param {string} email - The new email of the user.
   * @returns {User} The updated user object.
   */
  updateNameByEmailAndPassword = async (
    name: string,
    email: string,
    password: string
  ): Promise<Users | undefined> => {
    try {
      const user =email&&password&& await this.userRepository.findByEmailAndPassword(
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
        return updatedUser[0];
      } else {
        return null;
      }
    } catch (err) {
      console.log('Error updating user', err);
      throw err;
    }
  };
 /**
   * Delete a user by ID.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {boolean} Indicates whether the user was successfully deleted or not.
   */
  deleteUserByEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const user =email&&password&& await this.userRepository.findByEmailAndPassword(
        email,
        password
      );
      if (user && user.length > 0) {
        await this.userRepository.delete(email);
        return true;
      } else return false;
    } catch (err) {
      console.log('Error deleting user', err);
      throw err;
    }
  };
}
