import angular from 'angular'

import AuthConfig from './auth.config'
import AuthCtrl from './auth.controller'

export default (
  angular.module( 'app.auth', [] )
    .config( AuthConfig )
    .controller('AuthCtrl', AuthCtrl )
)