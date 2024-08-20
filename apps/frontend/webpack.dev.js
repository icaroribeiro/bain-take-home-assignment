const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const { PORT } = process.env;

module.exports = {
	entry: "./src/index.tsx",
	mode: "development",
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		port: PORT,
	},
	target: "web",
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								"@babel/preset-env",
								"@babel/preset-react",
								"@babel/preset-typescript",
							],
						},
					},
				],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public", "index.html"),
		}),
		new ReactRefreshWebpackPlugin(),
		new Dotenv({
			path: "./.env.dev",
		}),
	],
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
	},
};
