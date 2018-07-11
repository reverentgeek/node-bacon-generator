"use strict";

const hapiPino = require( "hapi-pino" );
const inert = require( "inert" );

const register = async server => {
	await server.register( [ {
		plugin: hapiPino,
		options: {
			prettyPrint: process.env.NODE_ENV !== "production",
			logEvents: [ "response" ]
		}
	}, inert ] );
};

module.exports = {
	register
};
