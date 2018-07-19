const 
      dependable = require('dependable'),
      path = require('path'),
      container = dependable.container();

const simpleDependencies = [
  ['passport', 'passport'],
  ['User', './models/user'],
  ['validator', 'validator']
];

simpleDependencies.forEach((val) => {
  container.register(val[0], function() {
    return require(val[1]);
  })
});

container.load(path.join(__dirname, '/controllers'));
container.load(path.join(__dirname, '/services'));
container.load(path.join(__dirname, '/helpers'));


container.register('container', function() {
  return container;
})

module.exports = container;