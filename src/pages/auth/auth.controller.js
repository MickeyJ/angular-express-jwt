/** @namespace this */

class AuthCtrl{
  constructor($state, UserService){
    this._UserService = UserService;
    this._$state = $state;
    this.title = this._$state.current.title;
    this.authType = this._$state.current.name.replace('app.', '');
  }
  
  submitForm(){
    this._UserService.attemptAuth(this.authType, this.formData)
      .then(res => {
        this._$state.go('app.home');
      })
      .catch(err => {
        this.error = err.data.error;
      })
  }
}

export default ['$state', 'UserService', AuthCtrl]
