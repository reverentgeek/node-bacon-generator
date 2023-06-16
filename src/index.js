"use strict";

const fastify = require( "fastify" );
const routes = require( "./routes" );
const dotenv = require( "dotenv" );
dotenv.config();

// Create the Fastify server
const server = fastify( { logger: true } );

const start = async () => {
	try {
		const { PORT: port, HOST: host } = process.env;
		const options = { port, host };

		// Register routes
		routes.register( server );

		// Run the server!
		await server.listen( options );
	} catch ( err ) {
		server.log.error( err );
		process.exit( 1 );
	}
};

start();
