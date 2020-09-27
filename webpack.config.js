const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name]-[id][hash:8].js",
    sourceMapFilename: "[name]-[contenthash][hash:8][chunkhash].js.map",
    chunkFilename: "[name]-[contenthash][hash:8][chunkhash].js"
  },
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].style.css",
      chunkFilename: "[id].style.css"
    }),
    new HtmlWebpackPlugin({
      title: 'Chill Jam Game',
      hash: true,
      filename: 'index.html',
      path: path.resolve(__dirname, 'dist'),
      template: "src/index.html"
    }),
  ],
  devServer: {
    contentBase: './dist',
    filename: 'dist/game.js',
    hot: true,
    inline: true,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      assets: path.resolve(__dirname, 'assets'),
      root: path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      /*cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },*/
    },
  },
  module: {
    rules: [
      {
        test: /.(mp3)$/,
        use: 'file-loader?name=sounds/[contenthash].[ext]'
      },
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
        test: /\.(ttf|woff)$/,
        exclude: /node_modules/,
        use: 'file-loader?name=fonts/[contenthash].[ext]'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader?name=images/[contenthash].[ext]',
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.(csv|txt)$/,
        exclude: /node_modules$/,
        use: 'raw-loader'
      }
    ]
  }
}
