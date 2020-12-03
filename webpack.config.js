// https://webpack.js.org/concepts/

var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	entry: "./index.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	plugins: [
		new HtmlWebpackPlugin({
			// generate a minified html with styles and scripts included
			filename: "index.html",
			template: "./index.html",
		}),
	],
	devServer: {
		contentBase: "./dist",
	},
};
