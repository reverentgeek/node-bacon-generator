"use strict";

const Hapi = require( "hapi" );
const path = require( "path" );
const plugins = require( "./plugins" );
const routes = require( "./routes" );
const DEV_PORT = 8000;

const server = Hapi.server( {
	host: "localhost",
	port: process.env.PORT || DEV_PORT
	// routes: {
	// 	files: {
	// 		relativeTo: path.join( __dirname, "public" )
	// 	}
	// }
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
