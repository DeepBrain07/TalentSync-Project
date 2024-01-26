// const path = require('path');

const config = {
    entry: './src/signin.html',  // Specify the entry point of your application
    output: {
      // filename: 'bundle.js',
      // path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: 'html-loader',
        }
      ],
    },
  };
  
  export default config;
  