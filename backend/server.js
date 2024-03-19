import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import connect from './db/db.js'

// Load environment variables from .env file
dotenv.config();

connect()
const PORT = process.env.PORT || 4050;
const app = express();

app.use(express.json());
app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.send('Hello World!!');
// });

app.use('/api', authRoutes);
app.use('/messages', messageRoutes);

app.listen(PORT, () => {
    // connectToDatabase();
    console.log(`App listening to port ${PORT}`)
});
