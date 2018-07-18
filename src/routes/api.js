"use strict";
const bacon = require( "../bacon" );
const joi = require( "joi" );
const boom = require( "boom" );
const MAX_POUNDS = 25;

const schema = joi.object().keys( {
	paragraphs: joi.number().integer().min( 1 ).max( MAX_POUNDS ).required()
} );

module.exports = server => {
	server.route( {
		method: "GET",
		path: "/api/bacon",
		config: {
			auth: "session"
		},
		handler( request ) {
			const model = {
				total: 1,
				paragraphs: bacon.generateBacon( 1 )
			};
			if ( request.auth.credentials && request.auth.credentials.profile ) {
				const { firstName, lastName, email } = request.auth.credentials.profile;
				model.firstName = firstName;
				model.lastName = lastName;
				model.email = email;
			}
			return model;
		}
	} );
	server.route( {
		method: "GET",
		path: "/api/bacon/{paragraphs}",
		config: {
			auth: "session"
		},
		handler( request ) {
			const res = joi.validate( request.params, schema );
			if ( res.error ) {
				request.log( [ "debug", "error", "paragraphs" ], res );
				return boom.badRequest( res.error );
			}

			const paragraphs = bacon.generateBacon( res.value.paragraphs );
			const model = {
				total: paragraphs.length,
				paragraphs
			};
			if ( request.auth.credentials && request.auth.credentials.profile ) {
				const { firstName, lastName, email } = request.auth.credentials.profile;
				model.firstName = firstName;
				model.lastName = lastName;
				model.email = email;
			}
			return model;
		}
	} );
}
;
