import dotenv from 'dotenv';
dotenv.config();
import app from './server.js';
import { DatabaseConnecter } from './config/database.js';

await DatabaseConnecter(process.env.DB_CONNECTION_STRING);

app.listen(process.env.PORT, () => {
  console.log(`Server listening to --> ${process.env.PORT}`);
  console.log('"Base-URL ==>>"', process.env.BASE_URL);
});
