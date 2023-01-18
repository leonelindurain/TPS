require("dotenv").config();

const { MONGODB_URL, MONGODB_SECRETO } = process.env;

let config = {
	sessionSecret: MONGODB_SECRETO,
	sessionTime: process.env.SESSION_TIME
};

let mongoDbUrl = MONGODB_URL;

module.exports = {
	mongoDbUrl,
	config,
	arguments
};