import authInterceptor from './auth.interceptor'

function AppConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

  $httpProvider.interceptors.push(authInterceptor);
  
  $stateProvider
    .state('app', {
      abstract: true,
      controllerAs: '$app',
      controller: 'AppCtrl',
      template: require('./../layout/_layout.html'),
      resolve: {
        auth: function(UserService){
          return UserService.verifyAuth()
        }
      }
    });

  $urlRouterProvider.otherwise('/home');
  $locationProvider.html5Mode(true);
  console.log(process.env.NODE_ENV);
}
export default [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$httpProvider' ,
  AppConfig
]
