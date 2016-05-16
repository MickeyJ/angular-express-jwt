
function authInterceptor(JWT, AppConstants, $window, $q){
  return{
    request(config){
      if(config.url.indexOf(AppConstants.API) === 0 && JWT.fetch()){
        config.headers.Authorization = `Bearer ${JWT.fetch()}`;
      }
      return config
    },
    responseError(rejection){
      if(rejection.status === 401){
        JWT.destroy();
        $window.location.reload();
      }
      return $q.reject(rejection)
    }
  }
}

export default ['JWT', 'AppConstants', '$window', '$q', authInterceptor]
