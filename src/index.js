import "dotenv/config.js";
import Fastify from "fastify";

import { register as routes } from "./routes/index.js";

// Create the Fastify server
const server = Fastify( { logger: true } );

const start = async () => {
	try {
		const { PORT: port, HOST: host } = process.env;
		const options = { port, host };

		// Register routes
		routes( server );

		// Run the server!
		await server.listen( options );
	} catch ( err ) {
		server.log.error( err );
		process.exit( 1 );
	}
};

start();
