import angular from 'angular';

import UserService from './user.service'
import PostService from './post.service'
import JwtService from './jwt.service'

export default (
  angular.module( 'app.services', [] )
    .service( 'UserService', UserService )
    .service( 'PostService', PostService )
    .service( 'JWT', JwtService )
)
