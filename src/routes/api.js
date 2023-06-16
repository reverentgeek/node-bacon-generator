"use strict";
const bacon = require( "../bacon" );

function register( server ) {
	server.get( "/api/bacon", () => {
		return bacon.generateBacon( 1 );
	} );

	server.get( "/api/bacon/:paragraphs", ( request, reply ) => {
		const paragraphs = bacon.generateBacon( request.params.paragraphs );
		return {
			total: paragraphs.length,
			paragraphs
		};
	} );
}

module.exports = {
	register
};
