import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import AuthRouter from './routes/auth.route.js';
import { ResponseStatus, StatusCode } from './models/common.models.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/app/auth', AuthRouter);

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status_code || StatusCode.InternalServerError).json({
    success: ResponseStatus.Failed,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
