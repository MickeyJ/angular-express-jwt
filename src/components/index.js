import angular from 'angular';

import GreetComponent from './greet/greet.component'

export default (
 angular.module('app.components', [])
   .component( 'greetUser', GreetComponent )
)
