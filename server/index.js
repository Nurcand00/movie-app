const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.use(express.json());

app.post("/tmdb", async (req, res) => {
	try {
		const body = req.body;
		const response = await axios.request(body);
		const data = response.data;
		res.status(response.status).send(data);
	} catch (err) {
		console.log(err);
		res.status(400).send("Axios Error");
	}
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log("Server started at port: " + PORT);
});
