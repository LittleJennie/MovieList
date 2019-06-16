### Notes on set up React and Webpack

Create a directory for your project before performing the following steps. And the following steps should be performed in the root of the directory. 

1. Install `npm`
    `npm init`
   Make sure to provide the relevant information to your package.json file. 
   According to [npm](https://docs.npmjs.com/creating-a-package-json-file), `main` should always be `index.js`. 
   You should be able to checkout what you intall with npm in the package.json file going forward. 

2. Install `react` and `react-dom`. To ensure you are installing with the correct package that is available in `npm`, you can verify the name of the package and its functionality in [npm](https://www.npmjs.com/). 
    `npm install --save react`
    `npm install --save react-dom`

3. Install `babel-core`, `babel-loader` and `babel-preset-react`. We will need to use Babel to compile JSX into regular Javascript.
    `npm install --save-dev babel-core babel-loader babel-preset-react`
    `npm install --save-dev babel-cli`

4. Install `webpack`. Please refer to the official [webpack](https://webpack.js.org/guides/getting-started/) documentation. `webpack` is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging.
    `npm install --save-dev webpack`
    `npm install --save-dev webpack-cli`
    `npm install -save-dev webpack-dev-server`

5. Create two directories within the root directory, `/dist` and `/src`. We will be using `/dist` to save the bundled file and the `/src` directory will be for `index.js` and `app.js`. 

6. Create a file named `webpack.config.js` in your root directory. We will be using this file to configure our webpack. 

7. Assign an empty object to `module.exports`. It should have the following propertities: 
    - `entry` : Entry point should be the outermost component class of your React project.
    - `module`: it should have a property called `rules` which has a value of an array. 
        - Within this array, it will have an object with the following properties
            - `test`: specifies which files will be affected by the loader (both `.js` and `.jsx`)
            - `exclue`: `/the node_modules/`
            - `loader`: `babel-loader` for JSX transformation
    - `output`: it should have a `name` property for what we will be naming the bundled file and a `path` property to specify the path you prefer to save the bundled file, in this case, it will be saved to `/dist` folder. 
    - `options`: it should have a `preset` property of `['react']`

8. Run `npx webpack`

9. You might see an error of such: 
     Error: Cannot find module '@babel/core'
     babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.
    
    This is due to a newer version that we install with `babel-loader`. To fix this error, we will need to update the `babel-core` and `babel-preset-env` package as well. 
        `npm install -D babel-loader @babel/core @babel/preset-env webpack`
        `npm install --save-dev @babel/preset-react`
    
    Update `preset` property in the `webpack.config.js` file to `'@babel/react', '@babel/preset-env'`

10. Run `npx webpack` again. 

11. Create a `start` and `build` script tag in `package.json` file. 
    `"build": "webpack -d --watch"`
    `"start": "webpack-dev-server"`