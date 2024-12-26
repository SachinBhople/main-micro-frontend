const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

const deps = require("./package.json").dependencies;

const printCompilationMessage = require('./compilation.config.js');

module.exports = (_, argv) => ({
  output: {
    // publicPath: "http://localhost:8088/",
    publicPath: "https://main-micro-frontend.vercel.app/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8088,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, 'src')],
    onListening: function (devServer) {
      const port = devServer.server.address().port

      printCompilationMessage('compiling', port)

      devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage('failure', port)
          } else {
            printCompilationMessage('success', port)
          }
        })
      })
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        // order: "order@http://localhost:8085/remoteEntry.js",
        order: "order@https://order-micro.vercel.app/remoteEntry.js",
        // product: "product@http://localhost:8009/remoteEntry.js",
        product: "product@https://product-micro-n79z.vercel.app/remoteEntry.js",
        // auth: "auth@http://localhost:8087/remoteEntry.js",
        auth: "auth@https://auth-micro-psi.vercel.app/remoteEntry.js",
        // admin: "admin@http://localhost:8089/remoteEntry.js",
        admin: "admin@https://admin-micro.vercel.app/remoteEntry.js",
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv()
  ],
});
