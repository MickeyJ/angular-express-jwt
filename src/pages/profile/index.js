import angular from 'angular';

import ProfileConfig from './profile.config.js';
import ProfileCtrl from './profile.controller.js';

export default (
  angular.module( 'app.profile', [] )
    .controller( 'ProfileCtrl', ProfileCtrl )
    .config( ProfileConfig )
);
