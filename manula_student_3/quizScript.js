/* Fuction for popup box 1 (question) */
function togglePopup1() {
    document.getElementById("popup-1").classList.toggle("active");

    /* Timer */
    var timeleft = 60;
    var downloadTimer = setInterval(function() {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Finished";
            return togglePopup2();
        } else {
            document.getElementById("countdown").innerHTML = "Time: " + timeleft;
        }
        timeleft -= 1;
    }, 1000);
}

/* Fuction for popup box 2 (result) */
function togglePopup2() {
    document.getElementById("popup-2").classList.toggle("active");

}




/* Fuction for get radio values and check is it correct or incorrect */
function getRadioValue() {
    var score = 0;
    var numOfQuestions = 10;
    var ansArr = ['a', 'c', 'c', 'd', 'd', 'c', 'a', 'd', 'c', 'b']; /* answers */

    /* Define questions from form values and names */
    q1 = document.forms['quiz']['q1'].value;
    q2 = document.forms['quiz']['q2'].value;
    q3 = document.forms['quiz']['q3'].value;
    q4 = document.forms['quiz']['q4'].value;
    q5 = document.forms['quiz']['q5'].value;
    q6 = document.forms['quiz']['q6'].value;
    q7 = document.forms['quiz']['q7'].value;
    q8 = document.forms['quiz']['q8'].value;
    q9 = document.forms['quiz']['q9'].value;
    q10 = document.forms['quiz']['q10'].value;

    /* checking the answers are correct or incorrect */
    for (var i = 1; i <= numOfQuestions; i++) {
        if (eval('q' + i) == ansArr[i - 1]) {
            score += 2;
        } else {
            score -= 1;
        }
    }

    /* Output the result */
    var results = document.getElementById('results');
    results.innerHTML = "<h2> You Scored " + score + " points out of " + "20" + " <h2>";
    alert('you scored ' + score + ' out of ' + "20");
    return false;
}