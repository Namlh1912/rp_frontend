/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your products directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/products/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `products`-- the default Gruntfile in Sails copies
 * flat files from `products` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `products` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },
  
  /************* PRODUCTS ***************/
  'get /products': 'Product.list',
  'get /products/:id': 'Product.detail',
  'get /products/name/:name': 'Product.searchName',  
  'post /products': 'Product.create',
  'patch /products': 'Product.update',
  'delete /products/:id': 'Product.delete',

  /************* ORDERS ***************/
  'get /orders/:column/:method': 'Order.list',
  'post /orders': 'Order.create',
  'get /order-products/:device_code': 'Order.orderProduct',
  'get /orders/:id': 'Order.detail',
  'get /user-orders/:id': 'Order.getByUserId',
  'get /subcribe-order-room': 'Order.subcribeToOrderRoom',
  'delete /orders/:id': 'Order.delete',

  /************* CATEGORIES ***************/
  'get /categories': 'Button.list',
  'post /categories': 'Button.create',
  'get /categories/:id': 'Button.detail',
  'patch /categories': 'Button.update',
  'delete /categories/:id': 'Button.delete',

  /************* USERS ***************/
  'post /login': 'User.login',
  'post /users': 'User.create',
  'get /users': 'User.list',
  'get /users/:id': 'User.detail',
  'patch /users': 'User.update',
  'delete /users/:id': 'User.delete',
  
  /************* BRANDS ***************/
  'post /brands': 'Brand.create',
  'get /brands/:id': 'Brand.detail',
  'get /brands': 'Brand.list',
  'get /brands/name/:name': 'Brand.searchByName',
  'patch /brands': 'Brand.update',
  'delete /brands/:id': 'Brand.delete',


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
