window.onload = function() {
  $("#draw").click(
    function() {
      var it = $('#it').val();
      resetPaper();
      dragon(parseInt(it));
   }); 
};

function resetPaper() {
    canvas = document.getElementById('board');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = "blue";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    path_size = parseInt($('#size').val());
    var width = 800;
    var height = 400;
    x0 = width / 2;
    y0 = height / 2;
    x1 = x0;
    y1 = y0 - path_size;
    turn = new Turn();
    orientation = 'N';
}


function Turn() {
    this.index = 0;
    this.turn = function(direction) {
	x0 = x1;
	y0 = y1;
	if (direction == 'right') {
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
	}
	if (direction == 'left') {
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
	}
    };
}


function dragon(code) {
    if (code == 0) {
	draw_path();
    } else {
	dragon(code-1);
	turn.turn('right');
	dragon_inverse(code-1);
    }
}

function dragon_inverse(code) {
    if (code == 0) {
	draw_path();
    } else {
	dragon(code-1);
	turn.turn('left');
	dragon_inverse(code-1);
    }
}

function draw_path() {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1,y1);
    ctx.closePath();
    ctx.stroke();
}