import angular from 'angular';

import UserService from './user.service'
import JwtService from './jwt.service'

export default (
  angular.module( 'app.services', [] )
    .service( 'UserService', UserService )
    .service( 'JWT', JwtService )
)
