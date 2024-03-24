import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
import marketRoutes from './routes/market.routes.js'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', taskRoutes)
app.use('/api', marketRoutes)
export default app;







/* Code before my attempts to deploy netlify

import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
import marketRoutes from './routes/market.routes.js'
import cors from 'cors'

const app = express();

origin: 'http://localhost:5173',
 {
    origin: 'https://alonso-chaves-shoppinghelper.netlify.app',
    credentials: true
} 
app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', taskRoutes)
app.use('/api', marketRoutes)
export default app; */