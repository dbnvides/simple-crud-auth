import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import authRouter from './routes/auth.router.js';

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/', authRouter)

export default app