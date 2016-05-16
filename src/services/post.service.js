/** @namespace this */

class PostService{
  constructor(AppConstants, $http, $state){
    this.posts = null;
    this.currentUserPosts = null;
    this._$state = $state;
    this._$http = $http;
    this._API = AppConstants.API;
  }
  fetchPosts(){
    return this._$http.get(`${this._API}/posts`)
    .then(response =>{
      this.posts = response.data.posts;
      return this.posts.map(x =>{
        x.commentFormVisible = false;
        x.commentListVisible = false;
      });
    })
  }
  fetchCurrentUserPosts(id){
    this.currentUserPosts = this.posts.filter(x =>(
      x.user_id === id
    ));
  }
  addPost(post){
    return(
      this._$http.post(`${this._API}/posts/new`, post)
      .then(newPost =>{
        this.fetchPosts();
        this._$state.go('app.home')
      })
    )
  }
  removePost(post){
    return(
      this._$http.post(`${this._API}/posts/remove`, post)
      .then(() =>{
        this.currentUserPosts.map((x,i) =>{
          if(x.post_id == post.post_id)
            this.currentUserPosts.splice(i, 1);
        });
      })
    )
  }
  newPostComment(comment){
    return(
      this._$http.post(`${this._API}/posts/comment`, comment)
      .then(res =>{
        this.posts.map(x =>(
          x.post_id == res.data.post_id
            ? x.comments.push(res.data.comment)
            : x
        ));
      })
    )
  }
  changeVotes(id, upOrDown){
    const postVote = {id, upOrDown};
    return (
      this._$http.post(`${this._API}/posts/votes`, postVote)
      .then(res =>{
        this.posts.map(x =>(
          x.post_id == res.data.post_id
            ? Object.assign(x, {votes: res.data.votes})
            : x
        ))
      })
    )
  }
  upvoteClass(post){
    if(post.votes > 0) {
      return "positive";
    } else if (post.votes < 0) {
      return "negative";
    } else {
      return "";
    }
  }
}
export default ['AppConstants', '$http', '$state', PostService]
