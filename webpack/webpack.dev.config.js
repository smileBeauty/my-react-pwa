const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const package = require("../package.json");

module.exports = {
  mode: "development",
  devtool: "source-map",
  cache: true,
  entry: {
    main: path.join(__dirname, "../src/main.tsx"),
  },
  output: {
    asyncChunks: true,
    charset: true,
    clean: true,
    path: path.join(__dirname, "../dist"),
    filename: "[name].[contenthash].js",
    publicPath: `/`,
  },
  performance: false,
  stats: "normal",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [
      ".vue",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".json",
      ".less",
      ".css",
    ],
  },
  devServer: {
    port: 8080,
    compress: true,
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    proxy: {},
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: false,
              cacheCompression: false,
            },
          },
        ],
      },
      {
        test: /\.(tsx|ts)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: false,
              cacheCompression: false,
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/",
            },
          },
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true, // ~ 表示从node_modules引入
              modules: {
                auto: /\.module.css$/,
                mode: "local",
                localIdentName: "[local]-[hash]",
                localIdentHashSalt: package.name,
                localIdentHashFunction: "md5",
                localIdentHashDigest: "hex",
                localIdentHashDigestLength: 20,
                hashStrategy: "minimal-subset",
                namedExport: false,
                exportGlobals: true,
                exportLocalsConvention: "dashesOnly",
                exportOnlyLocals: false,
              },
              importLoaders: 1,
              esModule: false,
              exportType: "array",
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/",
            },
          },
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true, // ~ 表示从node_modules引入
              modules: {
                auto: /\.module.less$/,
                mode: "local",
                localIdentName: "[local]-[hash]",
                localIdentHashSalt: package.name,
                localIdentHashFunction: "md5",
                localIdentHashDigest: "hex",
                localIdentHashDigestLength: 20,
                hashStrategy: "minimal-subset",
                namedExport: false,
                exportGlobals: false,
                exportLocalsConvention: "dashesOnly",
                exportOnlyLocals: false,
              },
              importLoaders: 2,
              esModule: false,
              exportType: "array",
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(scss|sass)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/",
            },
          },
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true, // ~ 表示从node_modules引入
              modules: {
                auto: /\.module.(sass|scss)$/,
                mode: "local",
                localIdentName: "[local]-[hash]",
                localIdentHashSalt: package.name,
                localIdentHashFunction: "md5",
                localIdentHashDigest: "hex",
                localIdentHashDigestLength: 20,
                hashStrategy: "minimal-subset",
                namedExport: false,
                exportGlobals: false,
                exportLocalsConvention: "asIs",
                exportOnlyLocals: false,
              },
              importLoaders: 2,
              esModule: false,
              exportType: "array",
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.styl$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/",
            },
          },
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true, // ~ 表示从node_modules引入
              modules: {
                auto: /\.module.styl$/,
                mode: "local",
                localIdentName: "[local]-[hash]",
                localIdentHashSalt: package.name,
                localIdentHashFunction: "md5",
                localIdentHashDigest: "hex",
                localIdentHashDigestLength: 20,
                hashStrategy: "minimal-subset",
                namedExport: false,
                exportGlobals: false,
                exportLocalsConvention: "dashesOnly",
                exportOnlyLocals: false,
              },
              importLoaders: 2,
              esModule: false,
              exportType: "array",
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "stylus-loader",
          },
        ],
      },
      {
        test: /\.json$/,
        use: "json-loader",
        type: "javascript/auto",
      },
      {
        test: /\.(png|jpg|jpeg|gif|bmp)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[contenthash].[ext]",
              limit: 8 * 1024, // 8kb
              fallback: "file-loader",
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[contenthash].[ext]",
              limit: 8 * 1024, // 8kb
              fallback: "file-loader",
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../static/index.html"),
      inject: "body",
    }),
    new CompressionWebpackPlugin(),
    new webpack.AutomaticPrefetchPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [{ from: "static", to: "static" }],
    }),
  ],
};
