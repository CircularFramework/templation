module.exports = {
	entry: './src/index',
	devtool: 'source-map',
	output: {
		filename: './dist/templation.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.js']
	}
};