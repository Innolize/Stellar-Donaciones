import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express';

const app = express()

app.get('/', function (req: Request, res: Response): void {
  res.send('hello world');
});