
import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { sign } from 'jsonwebtoken';
import { jwtConfig } from '../../config';
import { v4 as uuidv4 } from 'uuid';

/**
 * Controller for handling user-related requests.
 */
export class UserController {
  public userService: UserService;

   /**
    * Initializes the Service
   */
  constructor() {
    this.userService = new UserService();
  }
  /**
   * Get all users.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object
   */
  getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.userService.getAllUsers();
      if (users && users.length > 0) return res.json(users);
      else return res.status(404).json({ error: 'No users found' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
   *
   * Get a user by Email and Password.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object
   */
  getUserByEmailAndPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      //const { id } = req.params;
      const { email, password } = req.body;
      const user = await this.userService.getUserByEmailAndPassword(
        email,
        password
      );
      if (user) return res.json(user);
      else
        return res
          .status(404)
          .json({ error: 'No users found with that email and password' });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  /**
   *
   * Create a new user. If user with email already exists throes an error.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object
   *
   */
  createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email, password } = req.body;
      if (email === undefined || name === undefined || password === undefined) {
        return res
          .status(400)
          .json({ error: 'Name, Email and Password must be provided' });
      }
      const id = uuidv4();
      const user = await this.userService.createUser(id, name, email, password);
      if (user) return res.status(201).json(user);
      else {
        return res.status(400).json({
          error: 'Could not create User, user with this email already exists',
        });
      }
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  /**
   *
   * Update a user's details by verifying email and password
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   *  @returns {Promise<Response>} - The response object
   *
   */
  updateNameByEmailAndPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { name, email, password } = req.body;
      const user = await this.userService.updateNameByEmailAndPassword(
        name,
        email,
        password
      );
      if (user) return res.status(200).json(user);
      else
        return res
          .status(404)
          .json({ error: 'Cannot update user, make sure user is valid' });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  /**
   *
   * Delete  user  by verifying email and password
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   *  @returns {Promise<Response>} - The response object
   *
   */
  deleteUserByEmailAndPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.deleteUserByEmailAndPassword(
        email,
        password
      );
      if (result) {
        res.status(200).json('Successfully deleted user with email ' + email);
      } else
        return res
          .status(404)
          .json({ error: 'Cannot delete user. User does not exist' });
    } catch (err) {
      console.log('Error deleting user', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  /**
   *
   * Authenticate user with Email and Password
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   *  @returns {Promise<Response>} - The response object
   *
   */
  authenticateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const user =email&&password&& await this.userService.getUserByEmailAndPassword(
        email,
        password
      );
      if (user) {
        const token = sign(
          { id: user.id, email: user.email },
          jwtConfig.secretKey,
          {
            expiresIn: jwtConfig.expiresIn,
          }
        );
        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ error: 'Authentication failed' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  /**
   *
   * Register user with Name, Email and Password
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   *  @returns {Promise<Response>} - The response object
   *
   */
  register =async (req: Request, res: Response):Promise<Response>=>{
    try{
      const {name,email,password} =req.body;
      const id =uuidv4();
      const user = await this.userService.createUser(id,name,email,password);
      if(user){
        const token = sign(
          { id: user.id, email: user.email },
          jwtConfig.secretKey,
          {
            expiresIn: jwtConfig.expiresIn,
          }
        );
        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ error: 'User with this email already exists' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
