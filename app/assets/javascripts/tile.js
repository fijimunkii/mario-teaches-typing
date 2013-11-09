var Tile = Tile || {};

Tile.isCloud = {cloudNum: 1};

// random cloud generator
// 77% chance of rain
Tile.randCloud = function() {
  var randNum = Math.floor(Math.random()*11);
  if (randNum % 777 === 0) {
    this.isCloud = {cloudNum: 1};
  }
}

Tile.loadTiles = function(opt) {
  var $table = $('<table>');

  var tableString = '';

  // the sky
  for (i=0;i<2;i++) {
    tableString += '<tr><td><div class=\'tile\'></div></td></tr>';
  }

  // the clouds

  if (Tile.isCloud.cloudNum > 3) {
    for (var i=0; i<2; i++){
      tableString += '<tr><td><div class=\'tile\'></div></td></tr>';
    }
    Tile.randCloud();
  } else {
    for (var i=1; i<3; i++) {
      tableString += '<tr><td><div class=\'tile cloud-' + Tile.isCloud.cloudNum + '-' + i + '\'></div></td></tr>';
    }
    Tile.isCloud.cloudNum++
  }

  // patent pending cloud randomizer
  // 33.3333333% chance of rain
  // var randNum = Math.floor(Math.random()*11);
  // if (randNum % 3 === 0) {
  //   tableString += '<tr><td><div class=\'tile cloud\'></div></td></tr>';
  // } else {
  //   tableString += '<tr><td><div class=\'tile\'></div></td></tr>';
  // }



  //
  for (var r=0; r<opt.rows-7; r++) {
    tableString += '<tr>';
    for (var i=0; i<1; i++) {
      tableString += '<td><div class=\'tile\'></div></td>';
    }
    tableString += '</tr>';
  }

  // space for character or bad dude
  if (opt.dude && opt.dude === 'bad_dude') {
    tableString += '<tr><td><div class=\'tile koopa\'></div></td></tr>';
  } else if ( opt.dude && opt.dude == 'coin' ) {
    tableString += '<tr><td><div class=\'tile coin\'></div></td></tr>';
  } else {
    tableString += '<tr><td><div class=\'tile\'></div></td></tr>';
  }

  // the ground
  for (var i=0; i<2; i++) {
    tableString += '<tr><td><div class=\'tile rock\'></div></td></tr>';
  }

  return $table.html(tableString);
}
