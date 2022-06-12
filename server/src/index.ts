import "reflect-metadata";
import dotenv from 'dotenv'
dotenv.config()
import express, { NextFunction, Request, Response } from 'express';
import container from './config/inversify';
import { init as initUserModule } from './module/user/module'
import { init as initAuthModule } from './module/auth/module'
import { init as initOrganizationModule } from './module/organization/module'
import { init as initProjectModule } from './module/organization/module'
import { StatusCodes } from "http-status-codes";
import cors from 'cors'
import morgan from 'morgan'
import passport from "passport";
import { configurePassportStrategies } from "./module/auth/strategies";

const app = express()
app.use(passport.initialize())
configurePassportStrategies(container, passport)

app.use(cors({ credentials: true, origin: <string>process.env.ORIGIN_API_CONSUMER }))
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))



initUserModule(app, container)
initAuthModule(app, container)
initOrganizationModule(app, container)
initProjectModule(app, container)

const PORT = process.env.PORT || 8000



//si encuentra algun error imprevisto
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.log(err.stack)
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message })
})

//si no encuentre ruta
app.use(function (req: Request, res: Response, next: NextFunction) {
  const method = req.method
  const route = req.originalUrl
  res.status(StatusCodes.NOT_FOUND).send({
    "method": method,
    "route": route,
    'error': "Route not found"
  });
});

app.listen(PORT, () => console.log(`escuchando en http://localhost:${PORT}/`))


