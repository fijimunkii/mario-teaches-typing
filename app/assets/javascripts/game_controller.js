var GameController = GameController || {};

GameController.genColumn = function() {
  var height = $(document).height();
  var width = $(document).width();

  var $column = $('<div>');
  $column.addClass('column');
  $column.append(Tile.loadTiles({
    rows: height/16
  }));
  $('body').append($column);
}
