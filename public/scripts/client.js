/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function createTweetElement(tweet) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(tweet.content.text));
  var content = div.innerHTML;
  return `
  <article class="tweet">
          <header>
            <div>
              <img src="${tweet.user.avatars}" />
              <span>${tweet.user.name}</span>
            </div>
            <span>${tweet.user.handle}</span>
          </header>
          <div class="content">
            <p>${content}</p>
          </div>
          <footer>
            <span>${timeago.format(tweet.created_at)}</span>
            <div>
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
  `;
}
function renderTweets(tweets) {
  var tweetlist = tweets
    .map(function (tweet) {
      return createTweetElement(tweet);
    })
    .join("");
  $(".tweets-container").append(tweetlist);
}

$(document).ready(function () {
  function loadTweets() {
    $.get("/tweets/", function (data, status) {
      renderTweets(data.reverse());
    });
  }
  $(".new-tweet form").submit(function (event) {
    event.preventDefault();
    var tweetText = $("#tweet-text").val();
    if (!tweetText) {
      $(".error-message").slideDown();
      $(".error-message").text("please write a tweet");
    } else if (tweetText.length > 140) {
      $(".error-message").slideDown();
      $(".error-message").text("sorry tweet too long");
    } else {
      $(".error-message").slideUp();
      var query = $(this).serialize();
      $.post("/tweets/", query, function (data, status) {
        $("#tweet-text").val("");
        $(".tweets-container").html("");
        loadTweets();
      });
    }
  });
  loadTweets();
});
