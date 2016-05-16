
function AuthConfig($stateProvider){

  $stateProvider
    .state('app.login', {
      url: '/login',
      controllerAs: 'auth',
      controller: 'AuthCtrl',
      template: require('./_auth.html'),
      title: 'Log in',
      resolve: {
        auth: [ 'UserService', (UserService) =>{
            return UserService.ensureAuthIs(false)
          }
        ]
      }
    })
    
    .state('app.register', {
      url: '/register',
      controllerAs: 'auth',
      controller: 'AuthCtrl',
      template: require('./_auth.html'),
      title: 'Sign up',
      resolve: {
        auth: [ 'UserService', (UserService) =>{
            return UserService.ensureAuthIs(false)
          }
        ]
      }
    })
}

export default ['$stateProvider', AuthConfig]
