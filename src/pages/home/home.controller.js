/** @namespace this */

class HomeCtrl {
  constructor(AppConstants, UserService) {
    this.appName = AppConstants.appName;
    this._User = UserService.current;
  }
}
export default ['AppConstants', 'UserService', HomeCtrl]
