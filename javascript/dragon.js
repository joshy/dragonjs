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
    look: 0,
    kompass: new Array(function() {
			   y1 -= path_size;
		       },function() {
			   x1 += path_size;
		       }, function() {
			   y1 += path_size;
		       }, function() {
			   x1 -= path_size;
		       }),
    turn_right: function() {
	x0 = x1;
	y0 = y1;
	this.look += 1;
	if (this.look == 4) this.look = 0;
	this.kompass[this.look]();
    },
    turn_left: function() {
	x0 = x1;
	y0 = y1;
	this.look -= 1;
	if (this.look == -1) this.look = 3;
	this.kompass[this.look]();
    }
};


function dragon(code) {
    if (code == 0) {
	draw_path();
    } else {
	dragon(code-1);
	Turn.turn_right();
	dragon_inverse(code-1);
    }
}

function dragon_inverse(code) {
    if (code == 0) {
	draw_path();
    } else {
	dragon(code-1);
	Turn.turn_left();
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