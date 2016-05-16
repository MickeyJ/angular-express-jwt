
function HomeConfig($stateProvider) {

  $stateProvider
  .state('app.home', {
    url: '/home',
    controllerAs: 'home',
    controller: 'HomeCtrl',
    template: require('./_home.html'),
    title: 'Home',
    resolve: {
      posts: [ 'PostService', (PostService) =>{
        return PostService.fetchPosts()
      }]
    }
  });
}
export default ['$stateProvider', HomeConfig];
