"use strict";

const path = require( "path" );
const api = require( "./api" );
const staticRoutes = require( "./static" );

function register( server ) {
	api.register( server );
	staticRoutes.register( server );

	// Path to views folder
	const views = path.join( __dirname, "..", "views" );

	// Declare default route
	server.get( "/", async ( request, reply ) => {
		return reply.sendFile( "index.html", views );
	} );

}

module.exports = {
	register
};
