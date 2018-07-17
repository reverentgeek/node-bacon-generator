"use strict";

const Hapi = require( "hapi" );
const plugins = require( "./plugins" );
const routes = require( "./routes" );
const DEV_PORT = 8000;

const server = Hapi.server( {
	port: process.env.PORT || DEV_PORT
} );

async function start() {
	try {
		// register plugins
		await plugins.register( server );

		// register routes
		await routes.register( server );

		// start the server
		await server.start();
	} catch ( err ) {
		process.exit( 1 );
	}
}

start();
