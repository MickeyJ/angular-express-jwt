
const AppHeader= {
  template: require('./_header.html'),
  bindings: {
    appName: '=',
    pages: '='
  },
  controllerAs: 'header',
  controller: ['UserService', function(UserService){
    this.logOut = () =>{
      UserService.logout();

    }
  }]
};
export default AppHeader;
