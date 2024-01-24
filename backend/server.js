import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import routes from './routes.js'
import connectDb from './config/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';

connectDb();
dotenv.config();
const port = process.env.PORT;
console.log(port);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);

app.get('/', (req, res) => res.send("Server is ready"));

app.listen(port, () => console.log(`server is started on port ${port}`));