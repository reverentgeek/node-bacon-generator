import rg from "eslint-config-reverentgeek";

export default [
	...rg.configs["node-esm"],
	{
		rules: {
			"n/no-unpublished-import": [ "error", {
				allowModules: [ "eslint-config-reverentgeek" ]
			} ],
			"n/no-process-exit": "off",
			"n/no-unsupported-features/node-builtins": [ "error", {
				ignores: [ "fetch", "import.meta.dirname", "test.describe" ]
			} ]
		}
	},
	{
		files: [ "public/**/*.js" ],
		rules: {
			"n/no-missing-import": "off",
			"n/no-unpublished-import": "off"
		}
	}
];
