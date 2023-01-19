require("dotenv").config();

const { MONGODB_URL, MONGODB_SECRET } = process.env;

let config = {
	sessionSecret: MONGODB_SECRET,
	sessionTime: process.env.SESSION_TIME
};

let mongoDbUrl = MONGODB_URL;

module.exports = {
	mongoDbUrl,
	config,
	arguments
};