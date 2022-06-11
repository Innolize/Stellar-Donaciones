import "reflect-metadata";
import dotenv from 'dotenv'
dotenv.config()
import express, { NextFunction, Request, Response } from 'express';
import container from './config/inversify';
import { init as initUserModule } from './module/user/module'
import { StatusCodes } from "http-status-codes";
import cors from 'cors'
import morgan from 'morgan'

const app = express()
app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

initUserModule(app, container)

const PORT = process.env.PORT || 8000

app.use(cors({credentials: true, origin: <string>process.env.ORIGIN_API_CONSUMER}))
app.use(morgan('dev'))

//si encuentra algun error imprevisto
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.log(err.stack)
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message })
})

//si no encuentre ruta
app.use(function (req: Request, res: Response, next: NextFunction) {
  const method = req.method
  const route = req.originalUrl
  res.status(404).send({
    "method": method,
    "route": route,
    'error': "Route not found"
  });
});

app.listen(PORT, () => console.log(`escuchando en http://localhost:${PORT}/`))


