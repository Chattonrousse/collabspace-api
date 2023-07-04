import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import "reflect-metadata";
import "./container";

import { router } from "@routes/index";
import { AppError } from '@helpers/errorsHandler';

dotenv.config()

const app = express ()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.json({ limit: process.env.MAX_REQUEST_SIZE }))

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        statusCode: err.statusCode,
        result: err.result,
        message: err.message,
      });
    }
    return response.status(500).json({
      result: "Error",
      message: `Internal server Error - ${err.message}`
    });
  }
)

export { app }