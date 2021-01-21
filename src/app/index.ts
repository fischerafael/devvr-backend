import routes from './routes';
import { connectToDatabase } from './database';

import express from 'express';
import cors from 'cors';

connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
