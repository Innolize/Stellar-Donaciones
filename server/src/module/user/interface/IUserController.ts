import { Application, NextFunction, Request, Response } from "express";

export interface IUserController {
    configureRoutes: (app: Application) => void;
    getSingleUser: (req: Request, res: Response, next: NextFunction) => void;
    createUser: (req: Request, res: Response, next: NextFunction) => void;
}