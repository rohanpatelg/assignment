import express, { Express } from 'express';
import { AppDataSource } from '../data-source';
import router from '../routes/user.routes';
import { Request,Response,NextFunction } from 'express';
import { HttpError, InternalServerError } from 'http-errors';
/**
 * Wrapper for the Express Application which will create connections to the DB and expose them.
 */
export class App{
    private static _app: Express;
    /**
    * Service for user-related operations.
    * @returns {Promise<Express|void>} - Express app server instance.
    */
    public static async getApp():Promise<Express|void>{
        return await AppDataSource.initialize().then(()=>{
            App._app = express();
            App._app.use(express.json());
            App._app.use(router);
            App._app.use((err: any, req: Request, res: Response, next: NextFunction) => {
                if (!res.headersSent) {
                    if (!(err instanceof HttpError)) {
                        console.error(err);
                        err = new InternalServerError();
                    }
                    res.status(err.statusCode);
                    res.json({ error: err });
                }
                next();
            });
            return App._app;

        }).catch((err: any) => {
            console.log('Error creating connection with db..',err);
        });
    }
    /**
    * Closes the connection with DB
    * @returns {Promise<void>} - Promise resolved.
    */
    public static async closeApp(): Promise<void>{
        await AppDataSource.destroy().then(()=>{
            console.log('closing connection with db..')
        }).catch((err: any) => {
            console.log('Error closing connection the db..',err)
        })
    }
}