
function ShowAuthed(UserService){
  return{
    restrict: 'A',
    link(scope, element, attrs){
      scope.User = UserService;
      scope.$watch('User.current', (val) =>{
        if(val){
          if(attrs.showAuthed === 'true'){
            element.css({ display: 'inherit' })
          } else {
            element.css({ display: 'none' })
          }
        } else {
          if(attrs.showAuthed === 'true'){
            element.css({ display: 'none' })
          } else {
            element.css({ display: 'inherit' })
          }
        }
      })
    }
  }
}

export default ['UserService', ShowAuthed]