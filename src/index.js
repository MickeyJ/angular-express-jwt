import angular from 'angular'
import 'angular-ui-router'
import 'jquery'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'angular-animate/angular-animate'
import './style/main.scss'

import AppConstants  from './app/app.constants'
import AppConfig  from './app/app.config'
import AppCtrl from './app/app.controller'
import AppRun from './app/app.run'

import './services'
import './components'
import './directives'
import './layout'
import './pages/auth';
import './pages/home';

const requires = [
  'ui.router',
  'ngAnimate',
  'app.services',
  'app.layout',
  'app.components',
  'app.directives',
  'app.auth',
  'app.home'
];

angular
  .module( 'app', requires )
  .constant('AppConstants', AppConstants)
  .controller('AppCtrl', AppCtrl )
  .config( AppConfig )
  .run( AppRun );
