const path = require('path');
const { ProvidePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const Dotenv = require('dotenv-webpack');

const IS_DEV_ENV = process.env.NODE_ENV === 'development';

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	devtool: IS_DEV_ENV ? 'inline-source-map' : false,
	devServer: {
		static: { directory: path.join(__dirname, 'public') },
		compress: true,
		port: 3000,
		proxy: {
			'/api/v1/': {
				target: 'http://localhost:4000',
				secure: false,
				changeOrigin: true,
			},
		},
		open: true,
		historyApiFallback: true,
		hot: true,
	},
	optimization: IS_DEV_ENV
		? { minimize: false }
		: {
				minimizer: [
					new ESBuildMinifyPlugin({
						target: 'es2015',
						css: true,
						minifyWhitespace: true,
						minifyIdentifiers: true,
						minifySyntax: true,
						legalComments: 'none',
						format: 'iife',
					}),
				],
		  },
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, 'build'),
		chunkFilename: '[name].[chunkhash].bundle.js',
		filename: '[name].[contenthash].bundle.js',
		publicPath: '/',
		clean: true,
	},
	resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js', '.css'] },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: ['ts-loader'],
			},
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg|ico)$/,
				use: ['file-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			hash: true,
			template: path.join(__dirname, 'public', 'index.html'),
		}),
		new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['build'] }),
		new ProvidePlugin({ React: 'react' }),
		new CopyPlugin({
			patterns: [
				{ from: path.join(__dirname, 'public', 'robots.txt'), to: '' },
			],
		}),
		new Dotenv(),
	],
	performance: { hints: false },
};
