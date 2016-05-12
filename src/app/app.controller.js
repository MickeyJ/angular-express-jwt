/** @namespace this */

class AppCtrl {
  constructor($state, AppConstants) {

    this.state = $state;
    this.name = AppConstants.appName;
    this.pages = AppConstants.pages;
    
  }
}
export default ['$state', 'AppConstants', AppCtrl];
