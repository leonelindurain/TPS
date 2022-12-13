const http = require("http");
const dotenv = require("dotenv");

const options = {
	hostname: "localhost",
	port: process.env.PORT || 8080,
	path: "/api/productos",
	method: "GET"
};

const req = http.request(options, res => {
	console.log(`statusCode: ${res.statusCode}`);

	res.on("data", d => {
		process.stdout.write(d);
	});
});

req.on("error", error => {
	console.log(error);
});

req.end();