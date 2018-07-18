"use strict";

const api = require( "./api" );
const Boom = require( "boom" );

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
		options: {
			handler: ( request, h ) => {
				return h.file( "./public/index.html" );
			},
			auth: "session"
		}
	} );

	server.route( {
		method: "GET",
		path: "/auth/okta",
		options: {
			auth: "okta",
			handler( request, h ) {
				if ( !request.auth.isAuthenticated ) {
					throw Boom.unauthorized( `Authentication failed: ${ request.auth.error.message }` );
				}
				try {
					request.cookieAuth.set( request.auth.credentials );
					return h.redirect( "/" );
				} catch ( err ) {
					request.log( [ "error", "okta" ], err );
				}
			}
		}
	} );

	server.route( {
		method: "GET",
		path: "/logout",
		options: {
			handler: ( request, h ) => {
				request.cookieAuth.clear();
				return h.redirect( "/" );
			}
		}
	} );
};

module.exports = {
	register
};
