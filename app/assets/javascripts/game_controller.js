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
  } else {
    $column.append(Tile.loadTiles({
      rows: height/16
    }));
  }

  $('#game-container').append($column);
}

GameController.SoundBoard = function() {
  this.coin = new Audio('../sounds/coin.wav');
  // add more sounds
}

GameController.SoundBoard.playCoin = function() {

  this.coin.play();
  // TODO doesnt this work
}
