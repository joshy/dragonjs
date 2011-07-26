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
}


var Turn =  {
    x0: 400, y0: 200, x1: 400, y1: 195, 
    look: 0, // current index of kompass array
    kompass: [function(o) {
		  o.y1 -= path_size;
	      },function(o) {
		  o.x1 += path_size;
	      }, function(o) {
		  o.y1 += path_size;
	      }, function(o) {
		  o.x1 -= path_size;
	      }],
    save: function() {
	this.x0 = this.x1;
	this.y0 = this.y1;	
    },
    turn_right: function() {
	this.look += 1;
	if (this.look == 4) this.look = 0;
	this.save();	
	this.kompass[this.look](this);
    },
    turn_left: function() {
	this.look -= 1;
	if (this.look == -1) this.look = 3;
	this.save();
	this.kompass[this.look](this);
    },
    draw_path: function() {
	ctx.beginPath();
	ctx.moveTo(this.x0, this.y0);
	ctx.lineTo(this.x1,this.y1);
	ctx.closePath();
	ctx.stroke();
    }
};


function dragon(code) {
    if (code == 0) {
	Turn.draw_path();
    } else {
	dragon(code-1);
	Turn.turn_right();
	dragon_inverse(code-1);
    }
}

function dragon_inverse(code) {
    if (code == 0) {
	Turn.draw_path();
    } else {
	dragon(code-1);
	Turn.turn_left();
	dragon_inverse(code-1);
    }
}
