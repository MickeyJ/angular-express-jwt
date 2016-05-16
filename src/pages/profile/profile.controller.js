/** @namespace this */

class ProfileCtrl{
  constructor(UserService, PostService, $state) {
    this._$state = $state;
    this._PostService = PostService;
    this._User = UserService.current;
    this._userPosts = PostService.currentUserPosts;
    this.userPostVisible = true;
    this.newPostVisible = false;
  }
  showNewPostForm(){
    this.userPostVisible = !this.userPostVisible;
    this.newPostVisible = !this.newPostVisible;
  }
  checkForError(field){
    return field.$invalid && field.$touched;
  }
  upvoteClass(post){
    return this._PostService.upvoteClass(post)
  }
  addPost(newPost){
    const user_id = this._User.user_id;
    newPost.votes = 0;
    newPost.date = new Date();
    this._PostService.addPost({ newPost, user_id });
  }
  removePost(post){
    const {user_post_id, user_id, post_id} = post;
    this._PostService.removePost({user_post_id, user_id, post_id})
  }
  changeVotes(id, upOrDown) {
    this._PostService.changeVotes(id, upOrDown)
  }
}
export default ['UserService', 'PostService', '$state', ProfileCtrl]
