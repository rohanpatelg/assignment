import { Users } from '../entity/user.entity';
import { getRepository } from '../data-source';
import { Repository } from 'typeorm';
import {injectable} from 'tsyringe'

@injectable()
/**
 * Repository for user data access.
 * 
 */
export class UserRepository {
  private usersRepository: Repository<Users>;
/**
   * 
   * Initializes the repository
   * 
   */
  public constructor() {
    this.usersRepository = getRepository(Users);
  }
  /**
   * 
   * Get all users.
   * @returns {Promise<User[]>} A promise that resolves to the user object.
   * 
   */
  findAll = async (): Promise<Users[] | undefined> => {
    return this.usersRepository.find();
  };


  /**
   * 
   * Get a user by email.
   * @param {string} email - The email of the user.
   * @returns {Promise<User[]>} A promise that resolves to the user object.
   * 
   */

  findByName = async (name: string): Promise<Users[] | undefined> => {
    return this.usersRepository.findBy({name:name});
  }

  /**
   * 
   * Get a user by email.
   * @param {string} email - The email of the user.
   * @returns {Promise<User[]>} A promise that resolves to the user object.
   * 
   */
  findByEmail = async (email: string): Promise<Users[] | undefined> => {
    return this.usersRepository.findBy({ email: email });
  };

  /**
   * 
   * Get a user by email and password.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<User[]>} A promise that resolves to the user object.
   * 
   */

  findByEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<Users[]> => {
    return this.usersRepository.findBy({ email: email, password: password });
  };

  /**
   * Create a new user.
   * @param {Partial<Users>} userData - The user object to be created.
   * @returns {Promise<User>} A promise that resolves to the created user object.
   * 
   */
  createUser = async (userData: Partial<Users>): Promise<Users> => {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  };

  /**
   * 
   * Update a user's details.
   * @param {Partial<Users>} userData - The updated user object.
   * @returns {Promise<Users[]>} A promise that resolves to the updated user object.
   * 
   */

  updateNameByEmailAndPassword = async (
    email: string,
    userData: Partial<Users>
  ): Promise<Users[] | undefined> => {
    await this.usersRepository.update({ email: email }, userData);
    return this.usersRepository.findBy({ email: email });
  };
  
  /**
   * 
   * Delete a user's details.
   * @param {string} email - The email of the user to be deleted.
   * @returns {Promise<void>} A promise that resolves to  delete the  user object.
   * 
   */

  delete = async (email: string): Promise<void> => {
    await this.usersRepository.delete({ email: email });
  };
}
