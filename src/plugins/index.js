"use strict";

const hapiPino = require( "hapi-pino" );
const inert = require( "inert" );
const bell = require( "bell" );
const authCookie = require( "hapi-auth-cookie" );
const DEV_PORT = 8000;

const register = async server => {
	await server.register( [ {
		plugin: hapiPino,
		options: {
			prettyPrint: process.env.NODE_ENV !== "production",
			logEvents: [ "response" ]
		}
	}, inert, authCookie, bell ] );

	server.auth.strategy( "session", "cookie", {
		password: process.env.COOKIE_ENCRYPT_PWD,
		redirectTo: "/auth/okta", // If there is no session, redirect here
		isSecure: process.env.NODE_ENV === "production" // Should be set to true (which is the default) in production
	} );

	server.auth.strategy( "okta", "bell", {
		provider: "okta",
		config: { uri: process.env.ORG_URL },
		password: process.env.COOKIE_ENCRYPT_PWD,
		isSecure: process.env.NODE_ENV === "production",
		location: `http://localhost:${ process.env.PORT || DEV_PORT }`,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET
	} );
};

module.exports = {
	register
};
