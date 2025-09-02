const path = require('path');
const webpack = require('webpack');

const sharedConfig = {
  mode: 'production',
  entry: './src/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'self': 'typeof self !== "undefined" ? self : this',
    }),
  ],
};

const cjsConfig = {
  ...sharedConfig,
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/cjs'),
    library: {
      type: 'commonjs2',
    },
    globalObject: 'this',
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },
};

const esmConfig = {
  ...sharedConfig,
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/esm'),
    library: {
      type: 'module',
    },
    globalObject: 'this',
  },
  experiments: {
    outputModule: true,
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
};

module.exports = [cjsConfig, esmConfig]; 