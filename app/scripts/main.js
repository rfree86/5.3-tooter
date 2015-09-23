var models = require('models');
var views = require('views');

$(document).ready(function() {
  $('body').prepend(JST.application());

  $('.js-create-post-form').on('submit', function(event) {
event.preventDefault();
    $(document).trigger("create:post", [{title: "Cool", body: "Cool"}]);

  });


  var view = new PostsView();


  $(document).on('posts:fetched', function(event, posts) {
    view.showPosts(posts);
  });

  Post.fetch();
});

$(document).on('create:post', function() {

  var title = $('.js-create-post-form-title').val();

  var body = $('.js-create-post-form-body').val();

  $.ajax({
    url: "http://tiny-lasagna-server.herokuapp.com/collections/posts",
    type: 'POST',
    data: {
      title: title,
      body: body
    }
  });
});
