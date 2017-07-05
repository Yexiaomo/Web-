function showNumberWithAnimation(i, j, randNumber) {

  var numberCell = $('#number-cell-' + i + "-" + j);

  numberCell.css('background-color', getNumberBackgroundColor(randNumber));
  numberCell.css('color', getNumberColor(randNumber));
  numberCell.text(randNumber);

  numberCell.animate({
    width: cellSideLength,
    height: cellSideLength,
    top: getPosTop(i, j),
    left: getPosLeft(i, j)
  },
  500);
}

function showMoveAnimation(fromx, fromy, tox, toy) {
  var numberCell = $('#number-cell-' + fromx + '-' + fromy);
  numberCell.animate({
    top: getPosTop(tox, toy),
    left: getPosLeft(tox, toy)
  },
  200);
}

function updateScore(board) {
  
  $('#score').text( largestOfFour(board) );
}
function largestOfFour (arr) { 
  var newArray = arr.join(",").split(","); 
  return Math.max.apply({},newArray); 
}