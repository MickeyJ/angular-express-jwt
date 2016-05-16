/** @namespace this */

class HomeCtrl {
  constructor(AppConstants, UserService, PostService) {
    this._PostService = PostService;
    this._User = UserService.current;
    this._Posts = PostService.posts;

    this.sortableFields = ['votes', 'date', 'title'];
    this.currentSort = this.sortableFields[0];
    this.orderVal = '-votes';
  }
  setOrderVal(newVal) {
    this.currentSort = newVal;
    this.orderVal = newVal === "title" ? newVal : '-' + newVal;
  }
  upvoteClass(post){
    return this._PostService.upvoteClass(post)
  }
  toggleNewCommentVisibility(post){
    post.commentFormVisible = !post.commentFormVisible;
  }
  toggleCommentListVisibility(post){
    post.commentListVisible = !post.commentListVisible
  }
  addComment(newComment, post){
    newComment.date = new Date();
    this._PostService.newPostComment({newComment, post_id: post.post_id});
    post.commentFormVisible = !post.commentFormVisible;
    post.commentListVisible = true

  }
  changeVotes(id, upOrDown) {
    this._PostService.changeVotes(id, upOrDown)
  }
}

export default ['AppConstants', 'UserService', 'PostService', HomeCtrl]
