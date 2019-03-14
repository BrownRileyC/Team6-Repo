$(document).ready(function () {
  $("#loginBtn").click(function () {
    $("#loginModal").modal();
  });

  $("#signupBtn").click(function () {
    $("#signupModal").modal();
  });

  $("#signup-submit").on("click", function (event) {
    event.preventDefault();
    $("#signupModal").modal('hide');

    var newUser = {
      userName: $("#new-username-input").val().trim(),
      password: $("#new-pw-input").val().trim(),
      firstName: $("#firstName").val().trim(),
      lastName: $("#lastName").val().trim()
    };

    $.post("/api/users", newUser, function (data) {
      localStorage.setItem("userID", data);
      window.location.href = '/' + localStorage.getItem("userID");
    });
  });

  $("#login-submit").on("click", function (event) {
    event.preventDefault();
    $("#loginModal").modal('hide');

    var userName = $("#username-input").val().trim();
    var password = $("#pw-input").val().trim();

    $.post("/api/users/login", { userName: userName, password: password }, function (data) {
      if (data === false) {
        alert('Username or Password were incorrect, please try again')
        $("#username-input").val("")
        $("#pw-input").val("")
      } else {
        localStorage.setItem("userID", data);
        window.location.href = '/' + localStorage.getItem("userID");
      }
    });
  });

  $(".ui.animated.teal.button").on("click", function () {
    $(".add-event-modal").modal('hide');
    event.preventDefault();

    if (!localStorage.getItem("userID")) {
      alert("please log in")
    } else {
      var eventType = $(this).attr('data-type');
      var body = {
        eventName: $("." + eventType + "-name").val().trim(),
        eventDate: $("." + eventType + "-date").val().trim(),
        locationName: $("." + eventType + "-location").val().trim(),
        eventType: eventType,
        userID: localStorage.getItem("userID")
      }
      $.post("/api/new/event", body, function (data) {
        console.log("set the event in local storage")
        localStorage.setItem("eventID", data);
        window.location.href = '/event/' + localStorage.getItem("eventID");
        return false;
      })
    }
  });

  $("#backToHome").on("click", function () {
    window.location.href = "/";
  });

  $("#logout").on("click", function () {
    localStorage.clear();
    location.reload();
  });
});
