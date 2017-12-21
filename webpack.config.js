module.exports = {
	entry: './example/src/app',
	devtool: 'source-map',
	output: {
		filename: './example/example.js'
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