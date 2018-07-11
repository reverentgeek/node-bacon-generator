"use strict";

const api = require( "./api" );

const register = async server => {
	await api( server );

	// static files
	server.route( {
		method: "GET",
		path: "/public/{file*}",
		handler: {
			directory: {
				path: "public",
				redirectToSlash: true,
				index: true
			}
		},
		config: {
			auth: false
		}
	} );

	server.route( {
		method: "GET",
		path: "/",
		handler: ( request, h ) => {
			return h.file( "./public/index.html" );
		}
	} );
};

module.exports = {
	register
};
