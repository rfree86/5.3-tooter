var models = require('models');
var views = require('views');

$(document).ready(function() {
  $('body').prepend(JST.application());

  // Form interaction
  $('.js-create-post-form').on('submit', function(event) {
    event.preventDefault();
    var title = $('.js-create-post-form-title').val();
    var body = $('.js-create-post-form-body').val();
    $(document).trigger("create:post", [{title: title, body: body}]);
  });


  var view = new PostsView();


  $(document).on('posts:fetched', function(event, posts) {
    view.showPosts(posts);
  });

  Post.fetch();
});

// data/synchronization
$(document).on('create:post', function(event, postData) {
  $.ajax({
    url: "http://tiny-lasagna-server.herokuapp.com/collections/posts",
    type: 'POST',
    data: postData
  });
});
