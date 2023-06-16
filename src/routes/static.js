"use strict";

const fastifyStatic = require( "@fastify/static" );
const path = require( "path" );

function register( server ) {
	// Register the static file plugin
	const publicPath = path.join( __dirname, "..", "..", "public" );
	server.register( fastifyStatic, {
		root: publicPath
	} );

	// Serve fonts
	const fontPath = path.join( __dirname, "..", "..", "node_modules", "@fontsource", "montserrat", "files" );
	server.register( fastifyStatic, {
		root: fontPath,
		prefix: "/assets/files/",
		decorateReply: false // there can be only one!
	// reply decorator has been added by the first plugin registration
	} );

	// Serve vue.js static files
	const vuePath = path.join( __dirname, "..", "..", "node_modules", "vue", "dist" );
	server.register( fastifyStatic, {
		root: vuePath,
		prefix: "/vue/",
		decorateReply: false // there can be only one!
	// reply decorator has been added by the first plugin registration
	} );

	// Serve vue clipboard static files
	const vueClipboardPath = path.join( __dirname, "..", "..", "node_modules", "vue3-clipboard", "dist" );
	server.register( fastifyStatic, {
		root: vueClipboardPath,
		prefix: "/vueClip/",
		decorateReply: false // there can be only one!
	// reply decorator has been added by the first plugin registration
	} );
}

module.exports = {
	register
};
