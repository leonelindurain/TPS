const http = require("http");
const dotenv = require("dotenv");

const data = JSON.stringify({
	id: "4",
	title: "Calculadora",
	thumbnail:
		"https://cdn1.iconfinder.com/data/icons/software-hardware/200/software-24-128.png",
	price: 555
});

const options = {
	hostname: "localhost",
	port: process.env.PORT || 8080,
	path: "/api/productos",
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"Content-length": data.length
	}
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

req.write(data);
req.end();