$(document).ready(function () {
  localStorage.setItem('eventID', window.location.href.slice(window.location.href.lastIndexOf('/') + 1));

  $("#backToHome").on("click", function () {
    window.location.href = "/" + localStorage.getItem('userID');
    return false;
  });

  $("#surveyBtn").click(function () {
    $("#surveyModal").modal();
  });

  $("#survey-submit").on("click", function (event) {
    event.preventDefault();

    function validate() {
      var filledOut = true;
      $(".form-control").each(function () {
        if ($(this).val() === "") {
          filledOut = false;
        }
      });
      return filledOut;
    }
    if (validate()) {
      var responses = [];
      var score = 0;
      responses.push($("#surveyQuestion1").val(), $("#surveyQuestion2").val(), $("#surveyQuestion3").val(), $("#surveyQuestion4").val(), $("#surveyQuestion5").val());
      for (var i = 0; i < responses.length; i++) {
        score += parseInt(responses[i]);
      };
      console.log(score);

      score = score * 4;

      putData = {
        score: score,
        id: localStorage.getItem('eventID')
      };
      console.log(putData);

      $.ajax({
        method: "PUT",
        url: "/api/score",
        data: {score: score,
          id: localStorage.getItem('eventID')}
      }).done(function (data) {
        location.reload();
      })
    };
  });
});

function test() {
  $(".ui.checkbox").checkbox();
} test();

$(".new-task1").on("keyup", function (e) {
  if (e.which === 13) {

    var newCheck = $(this).val();

    console.log("new check" + newCheck);

    var checkList = [];
    console.log(checkList);

    checkList.push(newCheck);
    for (var i = 0; i < checkList.length; i++) {
      $("#newAppBox").append(
        "<input type='checkbox' tabindex='0' class='hidden' value='40'> ",
        "<label> " + checkList[i], "</label>"
      )
    }
    $(".new-task1").val(' ');
  }
})

$(".new-task2").on("keyup", function (e) {
  if (e.which === 13) {

    var newCheck = $(this).val();

    console.log("new check" + newCheck);

    var checkList = [];
    console.log(checkList);

    checkList.push(newCheck);
    for (var i = 0; i < checkList.length; i++) {
      $("#newResBox").append(
        "<input type='checkbox' tabindex='0' class='hidden' value='40'>",
        "<label> " + checkList[i], "</label>"
      )
    }
    $(".new-task2").val(' ');
  }
})

$(".new-task3").on("keyup", function (e) {
  if (e.which === 13) {

    var newCheck = $(this).val();

    console.log("new check" + newCheck);

    var checkList = [];
    console.log(checkList);

    checkList.push(newCheck);
    for (var i = 0; i < checkList.length; i++) {
      $("#newDocBox").append(
        "<input type='checkbox' tabindex='0' class='hidden'>",
        "<label> " + checkList[i], "</label>"
      )
    }
    $(".new-task3").val(' ');
  }
});

$('.ui.checkbox').on('click', function () {
  var valeur = 0;

  $('input:checked').each(function () {
    if ($(this).attr('value') > valeur) {
      valeur = $(this).attr('value');

      console.log(valeur);
    }
  });
  $('.progress-bar').css('width', valeur + '%').attr('aria-valuenow', valeur);
  $(".bar-perc").text(valeur + "%");
});
