import express from 'express';
const app = express();
import cors from 'cors';
// import router from './routers/router';
import { default as mongoose } from 'mongoose';

const SERVER_PORT = 4000;
const corsConfig = {
	origin: 'http://localhost:5173',
	credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

// app.use(router);

mongoose.connection.on('open', () => console.log('Connection to mongoDB is open'));

app.listen(SERVER_PORT, () => {
	try {
		console.log(`Server is listening on port ${SERVER_PORT}!`);
	} catch (error) {
		console.log(error);
	}
});
