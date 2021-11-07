const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const CopyWebpackPlugin       = require('copy-webpack-plugin')
const HtmlWebpackPlugin       = require('html-webpack-plugin')

const paths = require('./paths')

const pages = ['support','index','terms-and-conditions','users/login','users/register','users/logout','users/reset'];

module.exports = {

  // Where webpack looks to start building the bundle
  // entry: [paths.src + '/index.js'],
  entry: pages.reduce((config, page) => {
    config[page] = paths.src + `/js/${page}.js`;
    return config;
  }, {}),

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ].concat( pages.map( (page) =>
        new HtmlWebpackPlugin({
          title: `${page}`,
          favicon: paths.src + '/images/favicon.png',
          inject: true,
          template:  paths.src + `/views/${page}.ejs`,
          filename: `${page}/index.html`,
          chunks: [page],
        })
      )
    ),


  // Determine how modules within the project are treated
  module: {
    rules: [
      { test: /\.ejs$/i, use: ['ejs-easy-loader'], },

      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ['babel-loader'] },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },

    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.ejs', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}
