/** @type {import('tailwindcss').Config} */
"use strict";

const defaultTheme = require( "tailwindcss/defaultTheme" );

module.exports = {
	content: [ "src/views/*.html", "public/**/*.js" ],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"montserrat",
					...defaultTheme.fontFamily.sans
				]
			}
		},
	},
	plugins: [],
};
