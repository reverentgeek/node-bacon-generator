import fastifyStatic from "@fastify/static";
import { join } from "node:path";

const __dirname = import.meta.dirname;

export function register( server ) {
	// Register the static file plugin
	const publicPath = join( __dirname, "..", "..", "public" );
	server.register( fastifyStatic, {
		root: publicPath
	} );

	// Serve fonts
	const fontPath = join( __dirname, "..", "..", "node_modules", "@fontsource", "montserrat", "files" );
	server.register( fastifyStatic, {
		root: fontPath,
		prefix: "/assets/files/",
		decorateReply: false // there can be only one!
	// reply decorator has been added by the first plugin registration
	} );

	// Serve vue.js static files
	const vuePath = join( __dirname, "..", "..", "node_modules", "vue", "dist" );
	server.register( fastifyStatic, {
		root: vuePath,
		prefix: "/vue/",
		decorateReply: false // there can be only one!
	// reply decorator has been added by the first plugin registration
	} );

	// Serve vue clipboard static files
	const vueClipboardPath = join( __dirname, "..", "..", "node_modules", "vue3-clipboard", "dist" );
	server.register( fastifyStatic, {
		root: vueClipboardPath,
		prefix: "/vueClip/",
		decorateReply: false // there can be only one!
	// reply decorator has been added by the first plugin registration
	} );
}
