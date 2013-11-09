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

  var soundBoard = new GameController.SoundBoard();
  soundBoard.playMusic();

  var gameRunning = setInterval(removeAndAdd, 120);

  wordString = 'Thwomp, thwomp as fast as you can. You\'ll never squish the great Jumpman. Those cubic creeps with angry eyes will never see their master rise.'

  $('#word-to-type').html('Mario Teaches Typing. ');

  var $marioDiv = $('<div>');
  $marioDiv.addClass('mario-small-1');
  $('body').append($marioDiv);

  var runMario = setInterval(function(){
    if ($marioDiv.hasClass('mario-small-1')){
      $marioDiv.removeClass();
      $marioDiv.addClass('mario-small-2');
    } else if ($marioDiv.hasClass('mario-small-2')){
      $marioDiv.removeClass();
      $marioDiv.addClass('mario-small-1');
    }
  }, 300)


  function removeAndAdd(opt) {
    var marioColumn = $('#game-container')[0].children[4];

    if ($('#game-container > .bad-dude')[0] && opt === 'kill_a_dude') {
      var youGonnaDie = $('#game-container > .bad-dude')[0];
      $(youGonnaDie).remove();
      soundBoard.playLava();

    } else if ($(marioColumn).hasClass('bad-dude')) {
      clearInterval(gameRunning);
      soundBoard.pauseMusic();
      soundBoard.playLostLife();
      $(window).off();
      $(marioColumn).remove();

    } else if ( $(marioColumn).hasClass('coin-column') ) {
      soundBoard.playCoin();
      $(marioColumn).remove();

    } else {
      firstColumn = $('#game-container')[0].children[0];
      $(firstColumn).remove();
    }

    if (opt === 'bad_dude') {
      GameController.genColumn({bad_dude: true});

    } else if (opt === 'kill_a_dude') {
      GameController.genColumn({coin: true});

    } else {
      GameController.genColumn(null);
    }

  }

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
          soundBoard.playOneUp();
        } else if (wordsCorrect === 20) {
          soundBoard.playYoshi();
        }
      }
    } else {
      soundBoard.playBlargg();
      removeAndAdd('bad_dude');
      wordsCorrect = 0;
      lettersCorrect = 0;
    }

    if ($('#word-to-type')[0].textContent === '') {
      clearInterval(gameRunning);
      $(window).off();
      soundBoard.pauseMusic();
      soundBoard.playCourseClear();
    }

  });

});
