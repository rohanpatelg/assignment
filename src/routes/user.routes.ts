/**
 * Express router for handling API routes.
 * @module routes
 */
import express, { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { authenticateToken } from '../middleware/auth';
import {container} from 'tsyringe'

const router: Router = express.Router();
const userController = container.resolve<UserController>(UserController);
router.post('/register',userController.register);
/**
 * Route for user authentication.
 * @name POST /login
 * @function
 * @memberof module:routes
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {void}
 */

router.post('/login',userController.authenticateUser);

/**
 * Route for retrieving all users.
 * @name GET /users
 * @function
 * @memberof module:routes
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {void}
 */

router.get('/users', authenticateToken,userController.getUsers);

/**
 * Route for retrieving a user based on Email.
 * @name GET /user
 * @function
 * @memberof module:routes
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {void}
 */
router.get('/users/:name', authenticateToken,userController.getUsersByName)

/**
 * Route for retrieving a user based on Email.
 * @name GET /user
 * @function
 * @memberof module:routes
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {void}
 */

router.get('/user',authenticateToken, userController.getUserByEmail);

/**
 * Route for creating a user.
 * @name POST /users
 * @function
 * @memberof module:routes
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {void}
 */

router.post('/users',authenticateToken, userController.createUser);

/**
 * Route for updating a user.
 * @name PUT /user
 * @function
 * @memberof module:routes
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {void}
 */

router.put('/user',authenticateToken, userController.updateNameByEmailAndPassword);

/**
 * Route for deleting a user.
 * @name DELETE /user
 * @function
 * @memberof module:routes
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {void}
 */

router.delete('/user',authenticateToken, userController.deleteUserByEmailAndPassword);

export default router;
