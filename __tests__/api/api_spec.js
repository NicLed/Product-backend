const frisby = require('frisby');

// it('should be a teapot', function () {
//   return frisby.get('http://httpbin.org/status/418')
//     .expect('status', 418);
// });

it ('GET /products should return a status of 200 OK', function () {
  return frisby
    .get('http://ec2-3-83-49-124.compute-1.amazonaws.com:3030/products')
    .expect('status', 200)
    // .inspectJSON();
});

it ('GET /products/:product_id should return a status of 200 OK', function () {
  return frisby
    .get('http://ec2-3-83-49-124.compute-1.amazonaws.com:3030/products/1')
    .expect('status', 200)
    // .inspectJSON();
});

it ('GET /products/:product_id/styles should return a status of 200 OK', function () {
  return frisby
    .get('http://ec2-3-83-49-124.compute-1.amazonaws.com:3030/products/1/styles')
    .expect('status', 200)
    // .inspectJSON();
});

it ('GET /products/:product_id/related should return a status of 200 OK', function () {
  return frisby
    .get('http://ec2-3-83-49-124.compute-1.amazonaws.com:3030/products/1/related')
    .expect('status', 200)
    .inspectJSON();
});