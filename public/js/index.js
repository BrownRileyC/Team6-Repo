$(document).ready(function(){
  $("#loginBtn").click(function(){
    $("#loginModal").modal();
  });


  $("#login-submit").on("click", function(event) {
    event.preventDefault();
    
    var userName = $("#username-input").val().trim();
    var password = $("#pw-input").val().trim();

    console.log("calling get users api");

    $.get("/api/users/" + userName + password, function(data) {
      
      // log the data to our console
      console.log(data);
      
    });
  });

  $(".ui.animated.teal.button").on("click",function(){
    window.location.href="./event.html";
    return false;
  });

  $("#backToHome").on("click",function(){
    window.location.href="./index.html";
    return false;
  });

  $('.four.wide.column.ui.checkbox').checkbox();

});


