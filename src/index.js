import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
import marketRoutes from './routes/market.routes.js'
import cors from 'cors'
import { connectDB } from './db.js'

import serverless from 'serverless-http'; 

const app = express();

app.use(cors({
  origin: [
    'https://alonso-chaves-shoppinghelper.netlify.app',
    'http://localhost:4000',
  ],
  credentials: true
}));


app.use(morgan('dev')) 
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', taskRoutes)
app.use('/api', marketRoutes)

app.set('trust proxy', 1); //necesarry for the cookies to work in production with https (Reverse proxy)

connectDB()

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({
        'messageHome' : 'Iniciado el backend'
    })
})

app.use('/api', router)

var port = process.env.PORT || 9001;
app.listen(port, () => console.log("listening to port: ", port))
