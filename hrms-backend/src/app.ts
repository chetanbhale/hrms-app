import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRouter from './modules/clients/client.routes';
import { globalErrorHandler } from './middlewares/error.middleware';
import authRoutes from './modules/auth/auth.routes';

const app = express();


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use("/api/auth", authRoutes);
app.use('/api/clients',clientRouter)

app.get('/health',(req,res)=>{
    res.json({message:"HRMS Backend running."})
});

app.use(globalErrorHandler);
export default app