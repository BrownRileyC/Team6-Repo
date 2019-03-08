$(document).ready(function () {
  $("#loginBtn").click(function () {
    $("#loginModal").modal();
  });

  $("#signupBtn").click(function () {
    $("#signupModal").modal();
  });

  $("#signup-submit").on("click", function (event) {
    event.preventDefault();

    var newUser = {
      userName: $("#new-username-input").val().trim(),
      password: $("#new-pw-input").val().trim(),
      firstName: $("#firstName").val().trim(),
      lastName: $("#lastName").val().trim()
    };
    console.log("calling post users api");

    $.post("/api/users", newUser, function (data) {

      console.log("post request went through");
      
      localStorage.setItem("userID", JSON.stringify(data));

      
      // log the data to our console
      console.log(data);
    });
  });

  $("#login-submit").on("click", function (event) {
    event.preventDefault();

    var userName = $("#username-input").val().trim();
    var password = $("#pw-input").val().trim();

    console.log("calling get users api");

    $.get("/api/users/" + userName + "/" + password, function (data) {
      localStorage.setItem("userID", JSON.stringify(data));
      // log the data to our console
      console.log(data);
      // Add a get route here to grab all their event data and create the cards for each at the bottom
    });
  });

  $(".ui.animated.teal.button").on("click", function () {
    event.preventDefault();

    if (!localStorage.getItem("userID")) {
      alert("please log in")
    } else {
      var eventType = $(this).attr('data-type');
      console.log(eventType);

      var body = {
        eventName: $("." + eventType + "-name").val().trim(),
        eventDate: $("." + eventType + "-date").val().trim(),
        locationName: $("." + eventType + "-location").val().trim(),
        eventType: eventType,
        userID: localStorage.getItem("userID")
      }
      $.post("/api/events", body, function (data) {
        console.log(data);
        localStorage.setItem("eventID", JSON.stringify(data.id));
        window.location.href = "./event.html";
        return false;
      })
    }
  });

  $("#backToHome").on("click", function () {
    window.location.href = "./index.html";
    return false;
  });

  



});


