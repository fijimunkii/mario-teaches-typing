$(function() {

  // var $logo = $('<div>');
  // $logo.addClass('logo');
  // $logo.html('MARIO<br />Teaches Typing');
  // $('body').append($logo);

  // $logo.on('click', function(){
  //   GameController.startGame();
  // });

  var height = $(document).height();
  var width = $(document).width();

  for (i=0; i<width/16-1; i++) {
    GameController.genColumn();
  }

  function removeAndAdd() {
    var firstColumn = $('body')[0].children[0];
    $(firstColumn).remove();
    GameController.genColumn();
  }

  // setInterval(removeAndAdd, 100);







});
