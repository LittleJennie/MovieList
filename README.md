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



### Notes on set up Server and Database

## Server

1. `npm install express`, require `'express'` in `server.js`. 

2. Invoke express, set up port and listen to port: 
    `app = express()`
    `app.set('port', 3000)`
    `app.listen(app.get('port'))`

3. Set up routes by pointing `api/movies` to routes.js

4. In routes.js, set up different routes and point to methods set up in `./controller/index.js`

5. According to express.js official documentation, `req.body` by default is undefined. To use this property, we will need to parse the request **before** we routes to request handling methods. One way to parse is to `use` `express.json()`. 



## Database

1. Using mySQL and Sequelize. See [Sequelize](http://docs.sequelizejs.com/manual/getting-started.html) for reference.

2. `npm install sequelize --save` and `npm install mysql --save`.

3. Set up connection 

`const Sequelize = require('sequelize');`

// Option 1: Passing parameters separately
```
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
```

// Option 2: Passing a connection URI
`const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');`

4. Model a table. 
```
const User = sequelize.define('user', {
  // attributes
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
  // options
});
```

5. Set up schema of the database. Things to think about: what information an individual movie entry will be required? can one table handle all the data search already? 
    - it's always a better practice to have a auto-increment id for your entries, and the IMDB movie id can be a separate column. 

6. Synchronize a table with database and remember to export the table after `sync()`.
    `tablename.sync();`
    `exports.tablename = tablename`

7. Querying: 
```
// Find all users
User.findAll().then(users => {
  console.log("All users:", JSON.stringify(users, null, 4));
});

// Create a new user
User.create({ firstName: "Jane", lastName: "Doe" }).then(jane => {
  console.log("Jane's auto-generated ID:", jane.id);
});

// Delete everyone named "Jane"
User.destroy({
  where: {
    firstName: "Jane"
  }
}).then(() => {
  console.log("Done");
});

// Change everyone without a last name to "Doe"
User.update({ lastName: "Doe" }, {
  where: {
    lastName: null
  }
}).then(() => {
  console.log("Done");
});
```

8. To update a record, the option argument **has to** go before the returning and where statement:
```
    db.Movies.update(
        {towatch: Sequelize.literal('NOT towatch')},
        {returning: true, where: {imdbId: req.body.imdbId}}
    )
```
