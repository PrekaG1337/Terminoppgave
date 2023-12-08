var Clicks = 0, Timer = 5 ;
      var ClicksCount = document.getElementById("ClickCount");
      var ClickResultInfo = document.getElementById("ClickResultInfo");
      var ClickButton = document.getElementById("ClickButton");
      var ClearClicksResult = document.getElementById("ClearClicksResult");
      var StopClicksButton = document.getElementById("StopClicks");
      var ClickInterval = null;
   
    

      ClickResultInfo.innerHTML = '<span>YOUR MAX SCORE: ' + maxScore + ' (' + Math.round(maxScore / TestTime * 100) / 100 + ' CPS)</span>';

      function setMaxScore() { 
        var cDate = new Date();
        cDate.setTime(cDate.getTime() + 5 * 365 * 24 * 60 * 60 * 1000);
        document.cookie = "_10sec_click_test_max_score=" + maxScore + "; path=/; expires=" + cDate.toUTCString();
      }

      function ClickButtonPressed() {
        if (!ClickInterval) {
          StopClicksButton.removeAttribute("disabled");
          ClickResultInfo.innerHTML = '<span> Time to the end: ' + Timer + ' sec.</span>';
          ClickInterval = setTimeout(TimerDown, 1000);
          Timer--;
        }
        Clicks++;
        ClicksCount.innerHTML = '<span>' + Clicks + '</span>';

      }

      function setTime() {
        if (Timer >= 0) {
          Timer = 10;
          ClickResultInfo.innerHTML = '<span> Time to the end: ' + Timer + ' sec.</span>';
          TestTime = Timer;
          document.getElementById("ClickButton").disabled = false;
          document.getElementById("setTimeButton").blur();
        }
      }

      function TimerDown() {
        ClickResultInfo.innerHTML = '<span> Time to the end: ' + Timer + ' sec.</span>';
        if (Timer > 0) {
          ClickInterval = setTimeout(TimerDown, 1000);
          Timer--;
        } else if (Timer == 0) {
          clearTimeout(ClickInterval);
          ClickButton.setAttribute("disabled", "disabled");
          StopClicksButton.setAttribute("disabled", "disabled");
          ClearClicksResult.removeAttribute("disabled");
          document.getElementById("restartMaxScore").removeAttribute("disabled");
          if (maxScore < Clicks) {
            maxScore = Clicks;
            setMaxScore();
          }

          ClickResultInfo.innerHTML = '<span>YOUR MAX SCORE: ' + maxScore + ' (' + Math.round(maxScore / TestTime * 100) / 100 + ' CPS)</span>';
          ClickResultInfo.innerHTML += '<br/><span>YOUR SCORE: ' + Clicks + ' (' + Clicks / TestTime + ' CPS)</span>';
        }
      }




      function
        Pressed() {
        Clicks = 0;
        Timer = TestTime;
        ClickButton.removeAttribute("disabled");
        ClearClicksResult.setAttribute("disabled", "disabled");
        document.getElementById("restartMaxScore").setAttribute("disabled", "disabled");
        StopClicksButton.innerHTML = 'Stop';
        StopClicksButton.setAttribute("disabled", "disabled");
        ClicksCount.innerHTML = '0';
        ClickResultInfo.innerHTML = '<span>YOUR MAX SCORE: ' + maxScore + ' (' + Math.round(maxScore / TestTime * 100) / 100 + ' CPS)</span>';
        ClickInterval = null;
      }

      function ClearClicksResultPressed() {
      }




      function restartMaxScore() {
        var cDate = new Date();
        cDate.setTime(cDate.getTime() + 5 * 365 * 24 * 60 * 60 * 1000);
        document.cookie = "_10sec_click_test_max_score=" + 0 + "; path=/; expires=" + cDate.toUTCString();
        document.location.reload();
      }




      function StopClicks() {
        if (Timer > 0) {
          if (ClickInterval) {
            clearTimeout(ClickInterval);
            ClickButton.setAttribute("disabled", "disabled");
            ClearClicksResult.removeAttribute("disabled");
            StopClicksButton.innerHTML = 'Start';
            ClickInterval = null;
          } else {
            ClickInterval = setTimeout(TimerDown, 1000);
            ClickButton.removeAttribute("disabled");
            ClearClicksResult.setAttribute("disabled", "disabled");
            StopClicksButton.innerHTML = 'Stop';
          }
        } else {
          StopClicksButton.setAttribute("disabled", "disabled");
        }
      }

      function restart() {
        document.location.reload();
      }
     
     
     
      function doVote(event) {
  
  
        var vote_check = $('#dle-vote input:radio[name=vote_check]:checked').val();
  
        if (typeof vote_check == "undefined" && event == "vote") {
          return false;
        }  
  
        ShowLoading('');
  
        $.get(dle_root + "engine/ajax/controller.php?mod=vote", { vote_id: "1", vote_action: event, vote_check: vote_check, vote_skin: dle_skin, user_hash: dle_login_hash }, function (data) {
  
          HideLoading(''); 
          
  
          $("#vote-layer").fadeOut(500, function () {
            $(this).html(data);
            $(this).fadeIn(500);
          });
  
        });
      }