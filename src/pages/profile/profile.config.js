

function ProfileConfig($stateProvider) {

  $stateProvider
    .state('app.profile', {
      url: '/profile',
      controllerAs: 'profile',
      controller: 'ProfileCtrl',
      template: require('./_profile.html'),
      title: 'Profile',
      resolve: {
        auth(UserService){
          return UserService.ensureAuthIs(true)
        }
      }
    });
}
export default ['$stateProvider', ProfileConfig];
