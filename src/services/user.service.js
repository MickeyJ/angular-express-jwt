/** @namespace this */
  
class UserService{
  
  constructor(JWT, AppConstants, $q, $http, $state){
    this.current = null;
    this._JWT = JWT;
    this._$state = $state;
    this._$http = $http;
    this._$q = $q;
    this._API = AppConstants.API
  }
  
  attemptAuth(type, credentials){
    let route = (type === 'login') ? '/login' : '';
    return this._$http({
      url: this._API + route,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(res =>{
      this._JWT.save(res.data.token);
      this.current = res.data.user;
      console.log(this.current);
      return res;
    })
  }
  
  logout(){
    this.current = null;
    this._JWT.destroy();
    this._$state.go(this._$state.$current, null, { reload: true })
  }
  
  verifyAuth(){
    let deferred = this._$q.defer();
    if(!this._JWT.fetch()){
      deferred.resolve(false);
      return deferred.promise;
    }
    if(this.current){
      deferred.resolve(true)
    } else {
      this._$http({
        url: this._API,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this._JWT.fetch()}`
        }
      }).then(res =>{
        this.current = res.data.user;
        console.log(this.current);
        deferred.resolve(true);
      }, (err) => {
        console.error(err.data);
        this._JWT.destroy();
        deferred.resolve(false);
      })
    }
    deferred.resolve(true);
    return deferred.promise;
  }

  ensureAuthIs(bool){
    let deferred = this._$q.defer();
    this.verifyAuth().then(authType =>{
      if(authType !== bool){
        this._$state.go('app.home');
        deferred.resolve(false);
      } else {
        deferred.resolve(true);
      }
    });
    return deferred.promise;
  }
}
export default ['JWT', 'AppConstants', '$q', '$http', '$state', UserService]
