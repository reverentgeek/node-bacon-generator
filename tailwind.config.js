/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme"; // eslint-disable-line

export default {
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
