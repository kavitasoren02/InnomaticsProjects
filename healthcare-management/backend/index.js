import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import { ConnectToMongo } from './app/config/connectToMongo.js';
import mainRoutes from './app/routes/main-route.js'
import { cookiesService } from './app/auth/CookiesService.js'

dotenv.config();

await ConnectToMongo()

const PORT = process.env.PORT;

const app = express()

cookiesService(app)

app.use(cors({
  origin: 'https://healthcare-hc.netlify.app', // Specific origin, not '*'
  credentials: true, // Allow credentials (cookies, etc.)
}));

app.use(express.json())

app.use("/", mainRoutes)

app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`)
})
