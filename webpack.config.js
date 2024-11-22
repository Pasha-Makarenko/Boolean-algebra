const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "source-map",
  target: "node",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          },
          "ts-loader"
        ],
        exclude: /node_modules/
      }
    ]
  }
}
