const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
    sourceMapFilename: "[name].js.map"
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Chill Jam Game',
      hash: true,
      filename: 'index.html',
      path: path.resolve(__dirname, 'dist')
    })
  ],
  devServer: {
    contentBase: './dist',
    filename: 'dist/game.js',
    hot: true,
    inline: true,
  },
  resolve: {
    extensions: ['.js']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader?name=images/[name].[ext]',
          },
        ],
      },
    ]
  }
}
