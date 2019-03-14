$(document).ready(function () {
  localStorage.setItem('eventID', window.location.href.slice(window.location.href.lastIndexOf('/') + 1));
  var taskCount = 0;
  $.get('/api/tasks/' + localStorage.getItem('eventID'), function (data) {
    taskCount = parseInt(data);
    console.log(taskCount);
  })

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
    console.log('I started');
    $.ajax({
      method: "POST",
      url: "/api/tasks/new",
      data: {
        task: newTask,
        eventID: localStorage.getItem('eventID')
      }
    }).done(function(){
      location.reload();
      console.log(data);
    })
  };

  $(".new-task1").on("keyup", function (e) {
    console.log('Hey I ran');
    if (e.which === 13) {

      var newCheck = $(this).val();

      addTask(newCheck);
    }
  })

  $(".new-task2").on("keyup", function (e) {
    console.log('Hey I ran');
    if (e.which === 13) {

      var newCheck = $(this).val();

      addTask(newCheck);
    }
  })

  $(".new-task3").on("keyup", function (e) {
    console.log('Hey I ran');
    if (e.which === 13) {

      var newCheck = $(this).val();

      addTask(newCheck);
    }
  });

  var progressBar = function () {
    var valeur = 0;

    $('input:checked').each(function () {

      valeur += Math.floor(100 / taskCount);
      console.log("progress: " + valeur);

      if (100 - valeur < Math.floor(100 / taskCount)) {
        valeur = 100
      }
    });

    $('.progress-bar').css('width', valeur + '%').attr('aria-valuenow', valeur);
    $(".bar-perc").text(valeur + "%");
  }

  progressBar();

  $('.ui.checkbox').on('click', function () {
    console.log($(this).attr('data-status'));

    if ($(this).attr('data-status')) {
      $.ajax({
        method: "PUT",
        url: "/api/tasks",
        data: {
          id: $(this).attr('data-id'),
          status: true
        }
      }).done(function(data){
        console.log(data);
      })
    } else {
      $.ajax({
        method: "PUT",
        url: "/api/tasks",
        data: {
          id: $(this).attr('data-id'),
          status: true
        }
      }).done(function(data){
        console.log(data);
      })
    }
    
  });
});
