window.onload = function() {
  $("#draw").click(
    function() {
      var it = $('#it').val();
      resetPaper();
      dragon(parseInt(it));
   }); 
};

function resetPaper() {
    var canvas = document.getElementById('board');
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
}


var Turn =  {
    orientation: 'n',
    go_east: function() {
	this.orientation = 'o';
	x1 += path_size;
    },
    go_south: function() {
	this.orientation = 's';
	y1 += path_size;
    },
    go_north: function() {
	this.orientation = 'n';
	y1 -= path_size;
    },
    go_west: function() {
	this.orientation = 'w';
	x1 -= path_size;
    },
    turn: function(direction) {
	x0 = x1;
	y0 = y1;
	if (direction == 'right') {
	    if (this.orientation == 'n') {
		this.go_east();
	    } else if (this.orientation == 'o') {
		this.go_south();
	    } else if (this.orientation == 's') {
		this.go_west();
	    } else if (this.orientation == 'w') {
		this.go_north();
	    }
	    return;
	}
	if (direction == 'left') {
	    if (this.orientation == 'n') {
		this.go_west();
	    } else if (this.orientation == 'w') {
		this.go_south();
	    } else if (this.orientation == 's') {
		this.go_east();
	    } else if (this.orientation == 'o') {
		this.go_north();
	    }
	    return;
	}
    }
};



function dragon(code) {
    if (code == 0) {
	draw_path();
    } else {
	dragon(code-1);
	Turn.turn('right');
	dragon_inverse(code-1);
    }
}

function dragon_inverse(code) {
    if (code == 0) {
	draw_path();
    } else {
	dragon(code-1);
	Turn.turn('left');
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