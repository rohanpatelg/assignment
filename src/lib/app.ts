import express, { Express } from "express";
import { AppDataSource } from "../data-source";
import router from "../routes/user.routes";
import { Request,Response,NextFunction } from "express";
import { HttpError, InternalServerError } from "http-errors";
export class App{
    private static _app: Express;
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
            console.log(err);
        });
    }
}