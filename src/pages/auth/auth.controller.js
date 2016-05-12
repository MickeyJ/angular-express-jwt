/** @namespace this */

class AuthCtrl{
  constructor($state, UserService){
    this._UserService = UserService;
    this._$state = $state;
    this.title = this._$state.current.title;
    this.authType = this._$state.current.name.replace('app.', '');
  }
  
  submitForm(){
    this.isSubmitting = true;
    this._UserService.attemptAuth(this.authType, this.formData)
      .then(res =>{
        this.isSubmitting = false;
        this._$state.go('app.home');
      },(err) =>{
        this.isSubmitting = false;
        console.error(err.data);
      })
  }
}

export default ['$state', 'UserService', AuthCtrl]
