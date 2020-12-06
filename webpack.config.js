// https://webpack.js.org/concepts/

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/scripts/index.js",
	module: {
		rules: [
			{
				test: /\.m?js$/i,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader", // transpile javascript files
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
					//"style-loader", // Inject CSS into the DOM
					MiniCssExtractPlugin.loader, // instead of style-loader, create a css file without needing js
					"css-loader", // resolve url() and @imports inside CSS
					"postcss-loader", // apply postCSS fixes like autoprefixer and minifying
					{
						loader: "sass-loader", // transform SASS to standard CSS
						options: {
							implementation: require("sass"),
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				loader: "file-loader",
				options: {
					outputPath: "images",
				},
			},
			{
				test: /\.(woff|woff2|ttf|otf|eot)$/i,
				loader: "file-loader",
				options: {
					outputPath: "fonts",
				},
			},
		],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	plugins: [
		new CleanWebpackPlugin(), // delete all old files in dist folder
		new MiniCssExtractPlugin(), // extracts css into seperate files
		new HtmlWebpackPlugin({
			// generate a minified html with styles and scripts included
			filename: "index.html",
			template: "./src/index.html",
		}),
		new CopyPlugin({
			patterns: [{ from: "./src/public", to: "./" }],
		}),
	],
	devServer: {
		contentBase: "./dist",
		publicPath: "/",
	},
};
