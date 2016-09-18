var GameController = GameController || {};

GameController.genColumn = function(opt) {
  var height = $(document).height();
  var width = $(document).width();

  var $column = $('<div>');
  $column.addClass('column');

  if (opt && opt.bad_dude) {
    $column.addClass('bad-dude');
    $column.append(Tile.loadTiles({
      rows: height/16,
      dude: 'bad_dude'
    }));

  } else if (opt && opt.coin) {
    $column.addClass('coin-column');
    $column.append(Tile.loadTiles({
      rows: height/16,
      dude: 'coin'
    }));

  } else {
    $column.append(Tile.loadTiles({
      rows: height/16
    }));
  }

  $('#game-container').append($column);
}

GameController.SoundBoard = function() {
  this.coin = new Audio('sounds/coin.wav');
  this.lava = new Audio('sounds/lava.wav');
  this.lostLife = new Audio('sounds/lost_a_life.wav');
  this.music = new Audio('sounds/SMB-Ground_Theme.mp3');
  this.oneUp = new Audio('sounds/1-up.wav');
  this.yoshi = new Audio('sounds/yoshi.wav');
  this.blargg = new Audio('sounds/blargg.wav');
  this.courseClear = new Audio('sounds/course_clear.wav');
  // add more sounds
}

GameController.SoundBoard.prototype.playCoin = function() {
  this.coin.play();
}

GameController.SoundBoard.prototype.playLava = function() {
  this.lava.play();
}

GameController.SoundBoard.prototype.playLostLife = function() {
  this.lostLife.play();
}

GameController.SoundBoard.prototype.playMusic = function() {
  this.music.play();
}

GameController.SoundBoard.prototype.pauseMusic = function() {
  this.music.pause();
}

GameController.SoundBoard.prototype.playOneUp = function() {
  this.oneUp.play();
}

GameController.SoundBoard.prototype.playYoshi = function() {
  this.yoshi.play();
}

GameController.SoundBoard.prototype.playBlargg = function() {
  this.blargg.play();
}

GameController.SoundBoard.prototype.playCourseClear = function() {
  this.courseClear.play();
}
