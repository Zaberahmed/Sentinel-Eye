import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const userRoutes = require('./routes/userRoutes');
const SERVER_PORT = 4000; //process.env
const corsConfig = {
	origin: 'http://localhost:5173', //process.env
	credentials: true,
};

const DATABASE_PORT = 27017; //process.env
const DATABASE_NAME = 'Sentinel_Eye'; //process.env

const app = express();
app.use(cors(corsConfig));
app.use(express.json());
app.use(userRoutes);

mongoose.connection.on('open', () => console.log('Connection to database is open'));

app.listen(SERVER_PORT, () => {
	try {
		mongoose.connect(`mongodb://127.0.0.1:${DATABASE_PORT}/${DATABASE_NAME}`).then(() => console.log(`Server is listening on port ${SERVER_PORT}`));
	} catch (error) {
		console.log(error);
	}
});
