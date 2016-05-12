
const GreetComponent = {
  template: require('./_greet.html'),
  controllerAs: 'greet',
  bindings: {
    user: '='
  }
};

export default GreetComponent;
