const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const slsw = require('serverless-webpack');

module.exports = {
  "mode": "production",
  "target": "node12",
  "entry": slsw.lib.entries,
  "devtool": 'inline-source-map',
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
                      "projectReferences": true, // because we use typescript project references in our node packages
                      "configFile": path.resolve(__dirname, "packages/handlers/src/tsconfig.json")
                  }
              }
          }
      ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({ // becuase we use typescript path mapping we need to convert them to something javascript understands
        "configFile": path.resolve(__dirname, "packages/handlers/src/tsconfig.json")
      })
    ]
  },
  plugins: []
}
