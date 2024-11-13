import { generateBacon } from "../bacon.js";

export function register( server ) {
	server.get( "/api/bacon", () => {
		return generateBacon( 1 );
	} );

	server.get( "/api/bacon/:paragraphs", ( request ) => {
		const paragraphs = generateBacon( request.params.paragraphs );
		return {
			total: paragraphs.length,
			paragraphs
		};
	} );
}
