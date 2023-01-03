const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './build-babel/index.js',
  resolve: {
    extensions: [ '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "App"
  },
  plugins: [
    new webpack.DefinePlugin({
      AZURE_TENANT_ID: JSON.stringify(process.env.AZURE_TENANT_ID),
      AZURE_FRONTEND_CLIENT_ID: JSON.stringify(process.env.AZURE_FRONTEND_CLIENT_ID),
      AZURE_REST_API_CLIENT_ID: JSON.stringify(process.env.AZURE_REST_API_CLIENT_ID),
    }),
  ],
  devtool: "source-map"
};
