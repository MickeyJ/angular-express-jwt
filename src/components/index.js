import angular from 'angular';

import GreetComponent from './greet/greet.component'
import ErrorComponent from './error/error.component'

export default (
 angular.module('app.components', [])
   .component( 'greetUser', GreetComponent )
   .component( 'userError', ErrorComponent )
)
