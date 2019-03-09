$(document).ready(function () {
    $("#backToHome").on("click", function () {
        window.location.href = "./index.html";
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
        };
    });
});