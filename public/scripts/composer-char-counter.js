$(document).ready(function () {
  // --- our code goes here ---
  $(".new-tweet textarea").on("keyup", function (evt) {
    var counter = $(this).parent().find(".counter");
    var letterCount = $(this).val().length;
    counter.text(140-letterCount);
    if(letterCount>140){
      counter.css("color", "red")
    }else{
      counter.css("color", "unset");
    }
  });
});
