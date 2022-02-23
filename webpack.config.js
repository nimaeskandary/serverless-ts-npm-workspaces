// this is used by serverless to build deployment artifacts

const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const slsw = require('serverless-webpack');

module.exports = {
  "mode": "production",
  "target": "node14",
  "entry": slsw.lib.entries,
  "devtool": 'inline-source-map',
  "watch": false,
  "context": path.resolve(__dirname),
  "module": {
      "rules": [
          {
              "test": /\.ts?$/,
              "use": {
                  "loader": "ts-loader",
                  "options": {
                      "transpileOnly": false,
                      "projectReferences": true,
                      "configFile": path.resolve(__dirname, "packages/handlers/src/tsconfig.json")
                  }
              }
          }
      ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        "configFile": path.resolve(__dirname, "packages/handlers/src/tsconfig.json")
      })
    ]
  },
  plugins: []
}
