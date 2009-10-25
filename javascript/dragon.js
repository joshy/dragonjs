window.onload = function() {
  var width = 840;
  var height = 840;
  r = Raphael("holder", width, height);
  path_size = 3;
  x0 = width / 2;
  y0 = height / 2;
  x1 = x0;
  y1 = y0 - path_size;
  orientation = "N";
  turn = new Turn();


  $("#draw").click(
    function() {
      var it = $('#it').val();
      path_size = parseInt($('#size').val());
      dragon(parseInt(it));
   });

};


function Turn() {
  this.Kompass = new Array("N", "O", "S", "W");
  this.index = 0;
}

Turn.prototype.turn_right = function() {
  x0 = x1;
  y0 = y1;
  if (orientation == 'N') {
    orientation = 'O';
    x1 = x1 + path_size;
  } else if (orientation == 'O') {
    orientation = 'S';
    y1 = y1 + path_size;
  } else if (orientation == 'S') {
    orientation = 'W';
    x1 = x1 - path_size;
  } else if (orientation == 'W') {
    orientation = 'N';
    y1 = y1 - path_size;
  }

  return;
};

Turn.prototype.turn_left = function() {
  x0 = x1;
  y0 = y1;
  if (orientation == 'N') {
    orientation = 'W';
    x1 = x1 - path_size;
  } else if (orientation == 'W') {
    orientation = 'S';
    y1 = y1 + path_size;
  } else if (orientation == 'S') {
    orientation = 'O';
    x1 = x1 + path_size;
  } else if (orientation == 'O') {
    orientation = 'N';
    y1 = y1 - path_size;
  }

  return;
};

function dragon(code) {
  if (code == 0) {
    r.path("M " + x0 + " " + y0 + "L" + x1 + " " + y1).attr({stroke:"blue"});
  }
  else {
    dragon(code-1);
    turn.turn_right();
    dragon_inverse(code-1);
  }
}

function dragon_inverse(code) {
  if (code == 0)
    r.path("M " + x0 + " " + y0 + "L" + x1 + " " + y1).attr({stroke:"blue"});

  else {
    dragon(code-1);
    turn.turn_left();
    dragon_inverse(code-1);
  }
}