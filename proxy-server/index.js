const express = require('express');
const cors = require('cors');
const axios = require('axios');

const PROXY_SERVER_PORT = 5000;
const corsConfig = {
	origin: '*', //process.env
	credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsConfig));

app.get('/uk-crime', async (req, res) => {
	try {
		const { lat, lng, date } = req.query;
		const data = await axios.get('https://data.police.uk/api/crimes-street/all-crime?' + 'lat=' + lat + '&lng=' + lng + '&date=' + date);

		res.send(data.data);
	} catch (error) {
		console.log(error);
	}
});

app.listen(PROXY_SERVER_PORT, () => {
	try {
		console.log(`PROXY SERVER is listening at PORT ${PROXY_SERVER_PORT}`);
	} catch (error) {}
});
