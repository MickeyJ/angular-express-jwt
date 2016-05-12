import angular from 'angular';

import ShowAuthed from './show-authed.directive'

export default (
  angular.module('app.directives', [])
    .directive( 'showAuthed', ShowAuthed )
)
