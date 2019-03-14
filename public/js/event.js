$(document).ready(function () {
  localStorage.setItem('eventID', window.location.href.slice(window.location.href.lastIndexOf('/') + 1));
  var taskAmount = 9;

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
        data: {
          score: score,
          id: localStorage.getItem('eventID')
        }
      }).done(function (data) {
        location.reload();
      })
    };
  });

  function test() {
    $(".ui.checkbox").checkbox();
  }
  test();

  function addTask(newTask) {
    $.ajax({
      method: "POST",
      url: "/api/tasks/new",
      data: {
        task: newTask,
        eventID: localStorage.getItem('eventID')
      }
    }).done(function (data) {
      taskAmount ++;
      progressBar();
      console.log(data);
    })
  };

  $(".new-task1").on("keyup", function (e) {
    console.log('Hey I ran');
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
      
      addTask(newCheck);
    }
  })

  $(".new-task2").on("keyup", function (e) {
    console.log('Hey I ran');
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
      addTask(newCheck);
    }
  })

  $(".new-task3").on("keyup", function (e) {
    console.log('Hey I ran');
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
      addTask(newCheck);
    }
  });

  var progressBar = function () {
    var valeur = 0;

    $('input:checked').each(function () {
      valeur += Math.floor(100/taskAmount);
      if(valeur === 99||valeur > 100) {
        valeur = 100
      };

      console.log(valeur);
    });

    $('.progress-bar').css('width', valeur + '%').attr('aria-valuenow', valeur);
    $(".bar-perc").text(valeur + "%");
  }

  $('.ui.checkbox').on('click', function(){
    progressBar();
  });
});
