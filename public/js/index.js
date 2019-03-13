$(document).ready(function () {

<<<<<<< HEAD
=======
  //on page load, check if there is user in local storage and get events
  if (localStorage.getItem("userID")) {
    displayEvents("upcoming");

    var logoutDiv = $("<a id=\"logout\" href=\"#\">Logout</a>")
    $(".navbar").append(logoutDiv);

  }

  // function to get and display events
  function displayEvents(dateContext) {
    $.get("/api/events/" + dateContext + "/" + localStorage.getItem("userID"), function(data) {

      $("#event-list").empty();

      console.log(data);

      if (data && data.length) {
        for (var i=0; i<data.length; i++) {
          var itemDiv = $("<div class=\"item\">");
          var listItemDiv = $("<div class=\"content\">");
          itemDiv.append(listItemDiv);
          var headerItemDiv = $("<a class=\"header\" href=\"#\">");
          headerItemDiv.text(data[i].eventName);
          listItemDiv.append(headerItemDiv);
          var descriptionItemDiv = $("<div class=\"description\">");
          descriptionItemDiv.text(data[i].eventDate);
          listItemDiv.append(descriptionItemDiv);
          $("#event-list").append(itemDiv);
        }
      }
      else {
        var noEventsDiv = $("<div class=\"description\">");
        if (dateContext==="upcoming") {
          noEventsDiv.text("No Upcoming Events");
        }
        else {
          noEventsDiv.text("No Past Events");
        }
        $("#event-list").append(noEventsDiv);
      }


    });
  } 

>>>>>>> master
  // on click for events data toggles
  $(".toggle-button").click(function() {
    $(".toggle-button").removeClass("active");
    $(this).addClass("active");
    var dateContext = $(this).attr("data-tab");
    displayEvents(dateContext);
  })

  // on click for login button
  $("#loginBtn").click(function () {
    $("#loginModal").modal();
  });

  // on click for signup button
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
<<<<<<< HEAD
      localStorage.setItem("userID", data);
      window.location.href = '/'+localStorage.getItem("userID");
=======
      localStorage.setItem("userID", data.userID);
      location.reload();
>>>>>>> master
    });

  });

  $("#login-submit").on("click", function (event) {
    event.preventDefault();
    $("#loginModal").modal('hide');

    var userName = $("#username-input").val().trim();
    var password = $("#pw-input").val().trim();

    $.get("/api/users/" + userName + "/" + password, function (data) {
<<<<<<< HEAD
      localStorage.setItem("userID", data);
      window.location.href = '/'+localStorage.getItem("userID");
=======
      localStorage.setItem("userID", JSON.stringify(data));

      // displayEvents("upcoming");

>>>>>>> master
    });
    // refresh the page
    location.reload();
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
        window.location.href = '/event/'+localStorage.getItem("eventID");
        return false;
      })
    }
  });

  $("#backToHome").on("click", function () {
    window.location.href = "./index.html";
    return false;
  });

  $("#logout").on("click", function() {
    localStorage.clear();
<<<<<<< HEAD
    location.reload();
=======

    location.reload();

>>>>>>> master
  });

  



});


