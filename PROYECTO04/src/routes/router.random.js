const express = require("express");
const { Router } = express;
const routerRandom = Router();

const { fork } = require("child_process");

routerRandom.get("/randoms", (req, res) => {
	let { cant } = req.query;
	console.log(cant);
	const random = fork("./src/utils/calculo", [cant]);
	random.send("start");
	random.on("message", obj => {
		res.json(obj);
	});
});

module.exports = { routerRandom };