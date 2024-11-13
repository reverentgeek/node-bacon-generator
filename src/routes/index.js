
import { register as api } from "./api.js";
import { register as staticRoutes } from "./static.js";

import { join } from "node:path";

const __dirname = import.meta.dirname;

export function register( server ) {
	api( server );
	staticRoutes( server );

	// Path to views folder
	const views = join( __dirname, "..", "views" );

	// Declare default route
	server.get( "/", ( _request, reply ) => {
		return reply.sendFile( "index.html", views );
	} );
}
