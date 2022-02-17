const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const slsw = require('serverless-webpack');

module.exports = {
  "mode": "production",
  "target": "node12",
  "entry": slsw.lib.entries,
  "devtool": 'inline-source-map',
  "output": {
      "path": path.resolve(__dirname, 'build'),
      "filename": "[name].js",
      "library": {
        "type": "commonjs"
      }
  },
  "watch": false,
  "context": path.resolve(__dirname),
  "module": {
      "rules": [
          {
              "test": /\.ts?$/,
              "exclude": /node_modules/,
              "use": {
                  "loader": "ts-loader",
                  "options": {
                      "transpileOnly": false,
                      "projectReferences": true,
                      "configFile": path.resolve(__dirname, "../node/packages/handlers/src/tsconfig.json")
                  }
              }
          }
      ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../node/packages/handlers/node_modules'),
      path.resolve(__dirname, '../node/packages/handlers/'),
      path.resolve(__dirname, '../node/node_modules'),
      path.resolve(__dirname, '../node')
    ],
    extensions: [".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        "configFile": path.resolve(__dirname, "../node/packages/handlers/src/tsconfig.json")
      })
    ]
  },
  plugins: []
}
