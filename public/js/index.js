  //on page load, check if there is user in local storage and get events
  if (localStorage.getItem("userID")) {
    // displayEvents("upcoming");

    var logoutDiv = $("<a id=\"logout\" href=\"#\">Logout</a>")
    $(".navbar").append(logoutDiv);

  }

  // function to get and display events
  // function displayEvents(dateContext) {
  //   $.get("/api/events/" + dateContext + "/" + localStorage.getItem("userID"), function(data) {

  //     $("#event-list").empty();

  //     console.log(data);

  //     if (data && data.length) {
  //       for (var i=0; i<data.length; i++) {
  //         var itemDiv = $("<div class=\"item\">");
  //         var listItemDiv = $("<div class=\"content\">");
  //         itemDiv.append(listItemDiv);
  //         var headerItemDiv = $("<a class=\"header\" href=\"#\">");
  //         headerItemDiv.text(data[i].eventName);
  //         listItemDiv.append(headerItemDiv);
  //         var descriptionItemDiv = $("<div class=\"description\">");
  //         descriptionItemDiv.text(data[i].eventDate);
  //         listItemDiv.append(descriptionItemDiv);
  //         $("#event-list").append(itemDiv);
  //       }
  //     }
  //     else {
  //       var noEventsDiv = $("<div class=\"description\">");
  //       if (dateContext==="upcoming") {
  //         noEventsDiv.text("No Upcoming Events");
  //       }
  //       else {
  //         noEventsDiv.text("No Past Events");
  //       }
  //       $("#event-list").append(noEventsDiv);
  //     }


  //   });
  // } 

  // on click for events data toggles
  // $(".toggle-button").click(function() {
  //   $(".toggle-button").removeClass("active");
  //   $(this).addClass("active");
  //   var dateContext = $(this).attr("data-tab");
  //   // displayEvents(dateContext);
  // })

  // on click for login button
  $("#loginBtn").click(function () {
    event.preventDefault();
    $.post("/api/users/login",{userName: 'RileyCB', password: '1234'}, function(data){
      localStorage.setItem('userID',JSON.stringify(data));
      window.location.href = '/api/events/'+JSON.stringify(data);
    });
    

    console.log('hi');
    // $("#loginModal").modal();
  });

  // on click for signup button
  $("#signupBtn").click(function () {
    $("#signupModal").modal('show');
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

    });

  });

  $("#login-submit").on("click", function (event) {
    event.preventDefault();
    console.log('you clicked me')
    $("#loginModal").modal('hide');

    var userName = $("#username-input").val().trim();
    var password = $("#pw-input").val().trim();

    $.post("/api/users/login",{userName: userName, password: password});
    // refresh the page
  });

  $(".ui.animated.teal.button").on("click", function () {
    event.preventDefault();

      var eventType = $(this).attr('data-type');
      console.log(eventType);

      var body = {
        eventName: $("." + eventType + "-name").val().trim(),
        eventDate: $("." + eventType + "-date").val().trim(),
        locationName: $("." + eventType + "-location").val().trim(),
        eventType: eventType,
        userID: localStorage.getItem("userID")
      }
      $.post("/api/new/event", body, function (data) {
        window.location.href = '/event/'+JSON.stringify(data)
      })
  });

  $("#backToHome").on("click", function () {
    window.location.href = "./index.html";
    return false;
  });

  $("#logout").on("click", function() {
    localStorage.clear();

    location.reload();

  });


