import angular from 'angular';

import AppHeader from './header/header.component';
import AppFooter from './footer/footer.component';

export default (
  angular.module('app.layout', [])
    .component('appHeader', AppHeader )
    .component('appFooter', AppFooter )
) 
