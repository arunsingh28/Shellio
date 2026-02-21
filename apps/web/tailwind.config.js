const baseConfig = require("@repo/ui/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
	...baseConfig,
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
		'../../packages/ui/src/**/*.{ts,tsx}',
	],
}
