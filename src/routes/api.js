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
		handler() {
			return bacon.generateBacon( 1 );
		}
	} );
	server.route( {
		method: "GET",
		path: "/api/bacon/{paragraphs}",
		handler( request ) {
			const res = joi.validate( request.params, schema );
			if ( res.error ) {
				request.log( [ "debug", "error", "paragraphs" ], res );
				return boom.badRequest( res.error );
			}

			const paragraphs = bacon.generateBacon( res.value.paragraphs );
			return {
				total: paragraphs.length,
				paragraphs
			};
		}
	} );
}
;
