/* SIMON SAYS (G R Y B) */

// preload audio
var overSound = new Audio("over.wav");
var greenSound = new Audio("green.wav");
var redSound = new Audio("red.wav");
var yellowSound = new Audio("yellow.wav");
var blueSound = new Audio("blue.wav");
var wooHoo1 = new Audio("woohoo1.wav");
var wooHoo2 = new Audio("woohoo2.wav");
var wooHoo3 = new Audio("woohoo3.wav");
var wooHoo4 = new Audio("woohoo4.wav");
var wooHooArray = ["", wooHoo1, wooHoo2, wooHoo3, wooHoo4];

// does browser support HTML5 storage features?
var hasStorage = (typeof(Storage) !== "undefined"); 

// global vars
var userInput = false;
var squareInterval;
var pattern = [];
var score = 0;
var hiscore = 0;
var name;
var step = 0;
var sound;
var colorMap = ["", "simonGreen", "simonRed", "simonYellow", "simonBlue"];
var soundMap = ["", "green.wav", "red.wav", "yellow.wav", "blue.wav"];
var simonBorder = "4px solid white";

// simon animation
var SIMON_BEEP_DURATION = 500;
var SIMON_PAUSE_BETWEEN = 800;
var SIMON_START_PATTERN = 1000;

// functions
function getSound(id) {
	switch(id) {
		case "simonGreen":
			return greenSound;
			break;
		case "simonRed":
			return redSound;
			break;
		case "simonYellow":
			return yellowSound;
			break;
		case "simonBlue":
			return blueSound;
			break;
		default:
			return null;
	}
}

function startGame() {
	score = 0;
	step = 0;
	document.getElementById('score').innerHTML = "" + score;
	pattern = [];
	nextRound();
}

/* start next round, add to pattern and display to user */
function nextRound() {
	userInput = false;
	pattern.push(generateNum());
	var x = setTimeout(playPattern, SIMON_START_PATTERN);
}

/* play pattern with lights and sound */
function playPattern() {
	if (score > 0) {
		document.getElementById('thumb').style.visibility = 'hidden';
	}
	//var speed = document.getElementById('speed').value;
	//squareInterval = setInterval(lightSquare, SIMON_PAUSE_BETWEEN / speed);
	squareInterval = setInterval(lightSquare, SIMON_PAUSE_BETWEEN);
}

function lightSquare() {
	var thisColor = colorMap[pattern[step]];
	var squareId = document.getElementById(thisColor);
	squareId.style.border = simonBorder;
	squareId.style.opacity = "1.0";
	sound = getSound(thisColor);
	sound.play();
	//var speed = document.getElementById('speed').value;
	/*
	var x = setTimeout(function() {
		squareId.style.borderStyle = "none";
		squareId.style.opacity = "0.7";
	}, SIMON_BEEP_DURATION / speed);
	*/
	var x = setTimeout(function() {
		squareId.style.borderStyle = "none";
		squareId.style.opacity = "0.7";
	}, SIMON_BEEP_DURATION);
	step++;
	if (step >= pattern.length) {
		clearInterval(squareInterval);
		step = 0;
		userInput = true;
	}
}

function resetHiScore() {
	if (confirm('Are you sure you want to reset the high score?')) {
		setHiScore(0);
	}
}

/* set the high score (use localStorage if available) */
function setHiScore(hiscore) {
	document.getElementById('hiscore').innerHTML = hiscore;
	if (hasStorage) {
		localStorage.setItem("hiscore", hiscore);
		localStorage.setItem("name", "");
	}
}

// jQuery
$(document).ready(function() {
	//var duration = 800;

	function openDialog(id) {
		$(id).dialog({
			autoOpen: true,
			modal: true,
			width: 500,
			resizable: false,
			draggable: false,
			show: {
				effect: 'fade',
				duration: 800,
			},
			hide: {
				effect: 'fade',
				duration: 800,
			}
		});
	}
	
	function gameOver() {
		userInput = false;
		sound = overSound;
		sound.play();

		if (score > hiscore) {
			hiscore = score;
			openDialog('#newHighScore');
		} else {
			openDialog('#gameOver');
		}
	}
	
	$('#setHigh').click(function() {
		var thisName = $('#name').val();
		if (!thisName) {
			thisName = "Anonymous";
		}
		if (hasStorage) {
			localStorage.setItem("name", thisName);
			localStorage.setItem("hiscore", hiscore);
		}
		document.getElementById('hiscore').innerHTML = hiscore + " (" + thisName + ")";
		$('#name').val('');
		$('#newHighScore').dialog('close');
	});
		
	$('.simonSquare').hover(function() {
		// mouseover
		if (userInput) {
			$(this).css('border', simonBorder).css('cursor', 'pointer'); 
		}
	}, function() {
		// mouseout
		if (userInput) {
			$(this).css('border', 'none').css('cursor', 'auto'); 
		}
	});
	
	$('.simonSquare').mousedown(function() {
		if (userInput) {
			$(this).css('opacity', '1.0'); 
			sound = getSound($(this).attr('id'));
			sound.play();
		}
	});

	$('.simonSquare').mouseup(function() {
		if (userInput) {
			$(this).css('opacity', '0.7'); 
			sound.pause();
			sound.currentTime = 0;
		}
	});

	$('.simonSquare').click(function() {
		if (userInput) {
			var squareId = $(this).attr("id");
			var squareNum = jQuery.inArray(squareId, colorMap);
			if (squareNum === pattern[step]) {
				// user clicked correct color 
				step++;
				if (step >= pattern.length) {
					// round completed successfully
					$(this).css('opacity', '0.7').css('border', 'none').css('cursor', 'auto'); 
					
					// increment the score and display
					score++;
					$('#score').html("" + score);
					
					// play a random "woohoo" sound and display dancing dude
					sound = wooHooArray[generateNum()];
					sound.play();
					document.getElementById('thumb').style.visibility = 'visible';
					
					// reset for next round
					step = 0;
					nextRound();
				}
			} else {
				// oops... wrong color was clicked
				$(this).css('opacity', '0.7').css('border', 'none').css('cursor', 'auto'); 
				gameOver();
			}
		}
	});

	// save speed settings
	$('#speed').change(function() {
		if (hasStorage) {
			localStorage.setItem("speed", $(this).val());
		}
	});
	
	// retrieve data from storage
	if (hasStorage) {
		// hi score
		var storedHiscore = localStorage.getItem("hiscore");
		if (!storedHiscore) {
			hiscore = 0;
			localStorage.setItem("hiscore", hiscore);
		} else {
			hiscore = storedHiscore;
		}
		// name
		var storedName = localStorage.getItem("name");
		if (storedName) {
			storedName = ' (' + storedName + ')';
		} else {
			storedName = '';
		}
		// speed
		/*
		var storedSpeed = localStorage.getItem("speed");
		if (isNaN(storedSpeed)) {
			localStorage.setItem("speed", 1);
		} else {
			$('#speed').val(storedSpeed);
		}
		*/
		//alert('hiscore = '+ storedHiscore +'\nname='+storedName+'\nspeed='+storedSpeed);
	} else {
		hiscore = 0;
	}
	
	// display the high score
	$('#hiscore').html("" + hiscore + storedName);
	
	// display the instructions
	openDialog('#instructions');
});