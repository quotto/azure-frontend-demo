const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const  DotEnv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.tsx',
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/index.html'
    }),
    // new webpack.DefinePlugin({
    //   AZURE_TENANT_ID: JSON.stringify(process.env.AZURE_TENANT_ID),
    //   AZURE_FRONTEND_CLIENT_ID: JSON.stringify(process.env.AZURE_FRONTEND_CLIENT_ID),
    //   AZURE_PROFILE_API_CLIENT_ID: JSON.stringify(process.env.AZURE_PROFILE_API_CLIENT_ID),
    //   AZURE_PROFILE_API_ENDPOINT: JSON.stringify(process.env.AZURE_PROFILE_API_ENDPOINT),
    //   AZURE_ATTENDANCE_API_ENDPOINT: JSON.stringify(process.env.AZURE_ATTENDANCE_API_ENDPOINT),
    // }),
    new DotEnv()
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'build/[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/, //ローダーの処理対象外ファイル(ディレクトリ)
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              // Reactモジュールでasync/awaitを使うために必要
              // plugins: ['@babel/plugin-transform-runtime']
            }
          },
          'ts-loader'
        ]
      },
      {
        test: /\.css$/, //ローダーの処理対象ファイル
        // exclude: /node_modules/, //ローダーの処理対象外ファイル(ディレクトリ)
        use: [ //利用するローダー
          // MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  // Dockerコンテナ内でwatchするための設定
  // https://quotto-demo-functions-029e76e0.azurewebsites.net
  watchOptions: {
    ignored: '**/node_modules',
    poll: 1000
  }
}