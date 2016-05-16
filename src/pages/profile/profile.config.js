

function ProfileConfig($stateProvider) {

  $stateProvider
    .state('app.profile', {
      url: '/profile',
      controllerAs: 'profile',
      controller: 'ProfileCtrl',
      template: require('./_profile.html'),
      title: 'Profile',
      resolve: {
        auth: [ 'UserService', (UserService) =>{
          return UserService.ensureAuthIs(true)
        }],
        posts: [ 'UserService', 'PostService', (UserService, PostService) =>{
          return PostService.fetchCurrentUserPosts(UserService.current.user_id)
        }]
      }
    });
}
export default ['$stateProvider', ProfileConfig];
