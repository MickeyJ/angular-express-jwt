/** @namespace this */

class ProfileCtrl {
  constructor(AppConstants, UserService) {
    this.appName = AppConstants.appName;
    this._User = UserService.current;
  }
}
export default ['AppConstants', 'UserService', ProfileCtrl]
