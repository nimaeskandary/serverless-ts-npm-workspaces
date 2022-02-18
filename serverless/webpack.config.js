const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const slsw = require('serverless-webpack');

module.exports = {
  "mode": "production",
  "target": "node12",
  "entry": slsw.lib.entries, // serverless will generate this at runtime based on our handlers
  "devtool": 'inline-source-map',
  // "output": {
  //     "path": path.resolve(__dirname, 'build'),
  //     "filename": "[name].js",
  //     "library": {
  //       "type": "commonjs"
  //     }
  // },
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
                      "configFile": path.resolve(__dirname, "../node/packages/handlers/src/tsconfig.json")
                  }
              }
          }
      ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({ // becuase we use typescript path mapping we need to convert them to something javascript understands
        "configFile": path.resolve(__dirname, "../node/packages/handlers/src/tsconfig.json")
      })
    ]
  },
  plugins: []
}
