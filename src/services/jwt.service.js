
class Jwt{
  constructor(AppConstants, $window){
    this._AppConstants = AppConstants;
    this._$window = $window;
  }
  save(token){
    this._$window.localStorage[this._AppConstants.jwtKey] = token
  }
  fetch(){
    return this._$window.localStorage[this._AppConstants.jwtKey]
  }
  destroy(){
    this._$window.localStorage.removeItem(this._AppConstants.jwtKey)
  }
}

export default ['AppConstants', '$window', Jwt]