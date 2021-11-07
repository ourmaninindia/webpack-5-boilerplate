const path                    = require('path');
const MiniCssExtractPlugin    = require("mini-css-extract-plugin");
const HmlWebpackPlugin        = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

let mode    = process.env.NODE_ENV || "development";
let target  = "web";

//if(process.env.NODE_ENV === "production"){
//  mode   = "production";
//  target = "browserslist";
//};

module.exports = {
  // mode defaults to 'production' if not set
  mode: 'development',
  target: target,
  entry:{
    main: path.resolve(__dirname,'src/index.js'),
  },
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js',
    //filename: '[name].[contenthash].js',
    assetModuleFilename: '[name][ext]',
    //clean: false,
  },
  devtool: 'inline-source-map', // or source-map
  module:{
    rules:[
      // css
      {
        test: /\main.css$/, 
        use: ['style-loader','css-loader']
      },
      {
        test: /\.scss$/i, 
        use: 
        [
          MiniCssExtractPlugin.loader,
          'css-loader',
          "postcss-loader",
          {
            loader: "sass-loader",
              options: {
                implementation: require("dart-sass"),
              },
          },
        ]
      },
      // images
      {
        test: /\.(svg|ico|png|webp|jpg|jpeg|gif)$/, 
        type:'asset/resource'
      },
      // js for babel
      {
        test: /\.js$/,
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
            test: /\.pug$/,
            use: [ 
              {
                loader: "simple-pug-loader"
              }, 
            ],
       },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HmlWebpackPlugin({
      template: "./src/index.html",
    }),
    //new webpack.optimize.OccurrenceOrderPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoEmitOnErrorsPlugin(),
  ],

  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    //contentBase: "./dist",
    port: 8080,
    proxy: {
      "api":"http://localhost:3000"
    }
    //hot: true,
  },

};
