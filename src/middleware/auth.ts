
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config';
/**
 * Authenticate the user based on the token received from request headers.
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  try{
    
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  
    jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
      if (err) {
        res.status(403).json({ error: 'Invalid token' });
        return;
      }
      
      req.body.user = decoded; 
      next();
    });
  }catch(err){
    console.log('Error authorizing',err)
  }
};