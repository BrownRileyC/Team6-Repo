$(document).ready(function () {
  $("#backToHome").on("click", function () {
    window.location.href = "./index.html";
    return false;
  });

  // function to make the checkboxes clickable

  function test() {
    $(".ui.checkbox").checkbox();
  } test();

  // new appearance checkbox and append to page
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
  // new research  checkbox and append to page
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
  // new  document checkbox and append to page
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


  // progress bar w/ checklist functionality
  $('.ui.checkbox').on('click', function () {
    var valeur = 0;

    $('input:checked').each(function () {
      if ($(this).attr('value') > valeur) {
        valeur = $(this).attr('value');

        console.log(valeur);
      }
    });
    $('.progress-bar').css('width', valeur + '%').attr('aria-valuenow', valeur);
    $(".bar-perc").text(valeur+"%");
  });





});








