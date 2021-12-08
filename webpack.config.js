const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  CopyPlugin = require('copy-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  autoprefixer = require('autoprefixer');

const isDev = process.env.NODE_ENV === 'development';
console.log(isDev);

module.exports = {
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'app.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDev ? 'bundle.js' : '[contenthash].js',
  },
  mode: 'development',
  devServer: {
    port: 4200,
    open: true,
    watchFiles: './src/index.html',
    hot: isDev,
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: !isDev,
      template: './src/index.html',
      inject: 'body',
      scriptLoading: 'blocking',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? 'style.css' : '[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/img'),
          to: path.resolve(__dirname, 'dist/img'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
