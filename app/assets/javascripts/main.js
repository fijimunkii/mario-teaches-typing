$(function() {

   //set this variable according to the need within the page
    var BACKSPACE_NAV_DISABLED = true;

    function fnPreventBackspace(event){if (BACKSPACE_NAV_DISABLED && event.keyCode == 8) {return false;}}
    function fnPreventBackspacePropagation(event){if(BACKSPACE_NAV_DISABLED && event.keyCode == 8){event.stopPropagation();}return true;}

    //for IE use keydown, for Mozilla keypress
    //as described in scr: http://www.codeproject.com/KB/scripting/PreventDropdownBackSpace.aspx
    $(document).keypress(fnPreventBackspace);
    $(document).keydown(fnPreventBackspace);

    //Allow Backspace is the following controls
    $('input').keypress(fnPreventBackspacePropagation);
    $('input').keydown(fnPreventBackspacePropagation);
    $('textarea').keypress(fnPreventBackspacePropagation);
    $('textarea').keydown(fnPreventBackspacePropagation);

  // var $logo = $('<div>');
  // $logo.addClass('logo');
  // $logo.html('MARIO<br />Teaches Typing');
  // $('body').append($logo);

  // $logo.on('click', function(){
  //   GameController.startGame();
  // });
  var wordsCorrect = 0;
  var lettersCorrect = 0;

  var width = $(window).width();

  for (i=0; i<width/16-1; i++) {
    GameController.genColumn();
  }

  function removeAndAdd(opt) {

    if ($('#game-container > .bad-dude')[0] && opt === 'kill_a_dude') {
      var youGonnaDie = $('#game-container > .bad-dude')[0];
      $(youGonnaDie).remove();
      var audio = new Audio('../sounds/lava.wav');
      audio.play();

    } else {
      var firstColumn = $('#game-container')[0].children[0];
      if ($(firstColumn).hasClass('bad-dude')) {
        clearInterval(gameRunning);
        var audio = new Audio('../sounds/lost_a_life.wav');
        audio.play();
      }
      $(firstColumn).remove();
    }

    if (opt === 'bad_dude') {
      GameController.genColumn({bad_dude: true});
    } else {
    GameController.genColumn(null);
    }

  }

  var gameRunning = setInterval(removeAndAdd, 100);

  wordString = 'Thwomp, thwomp as fast as you can. You\'ll never squish the great Jumpman. Those cubic creeps with angry eyes will never see their master rise.'

  $('#word-to-type').html('mario teaches typing. ');

  $(window).on('keypress', function(e) {
    e.preventDefault;
    var userKey = String.fromCharCode(e.which),
        requiredText = $('#word-to-type')[0].textContent,
        requiredKey = requiredText[0],
        hopefulNewText = requiredText.slice(1);

    console.log(userKey);

    if (userKey === requiredKey) {
      $('#word-to-type')[0].textContent = hopefulNewText;
      lettersCorrect++;
      if (lettersCorrect >= 10) {
        var audio = new Audio('../sounds/coin.wav');
        audio.play();
      }

      if (userKey === ' ') {
        var spaceIndex = wordString.indexOf(' ') + 1;
          if (spaceIndex === 0) {
            spaceIndex = wordString.indexOf('.') + 1;
          }
        $('#word-to-type')[0].textContent += wordString.slice(0, spaceIndex);
        wordString = wordString.slice(spaceIndex);
        wordsCorrect++;
        removeAndAdd('kill_a_dude');

        if (wordsCorrect === 10) {
          var audio = new Audio('../sounds/1-up.wav');
          audio.play();
        } else if (wordsCorrect === 20) {
          var audio = new Audio('../sounds/yoshi.wav');
          audio.play();
        }
      }
    } else {
      var audio = new Audio('../sounds/blargg.wav');
      audio.play();
      removeAndAdd('bad_dude');
      wordsCorrect = 0;
      lettersCorrect = 0;
    }

    if ($('#word-to-type')[0].textContent === '') {
      clearInterval(gameRunning);
      $(window).off();
      var audio = new Audio('../sounds/course_clear.wav');
      audio.play();
    }

  });

});
