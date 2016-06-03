/* returns whole num between 1 and n */
function generateNum(n) {
	if (!n) {
		n = 4;
	}
	return Math.floor(Math.random() * n) + 1;
}

/* shuffles an array in place */
function shuffle(array) {
	var i = 0
		, j = 0
		, temp = null

	for (i = array.length - 1; i > 0; i -= 1) {
		j = Math.floor(Math.random() * (i + 1))
		temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
}

/* create an array with n elements, where values are 0..n-1 */
/* EXAMPLE: createRandomArray(5) = [2,4,1,0,3] */
function createRandomArray(n) {
	var theArray = [];
	for (var i=0; i<n; i++) {
		theArray[i] = i;
	}
	shuffle(theArray);
	return theArray;
}

// play the song and fade it in over a period of 'fadeDuration' seconds
function playMusic(song, fadeDuration) {
	if (!fadeDuration) {
		fadeDuration = 10;
	}
	
	// increase volume in 20 increments
	var increment = 0.05; // the % increase
	var speed = fadeDuration * 50; // in milliseconds
	
	// start music with volume muted, 15 seconds in
	song.volume = 0;
	song.currentTime = 30;
	song.play();

	// fade in the music
	var fadeInMusic = function(song) {
		// increase the volume incrementally until max reached
		setTimeout(function() {
			if (song.volume < 1 - increment) {
				song.volume += increment;
				fadeInMusic(song);
			} else {
				song.volume = 1;
			}
		}, speed);
	}
	fadeInMusic(song);
}

// pause or play 'song', change button css accordingly, store preference
function toggleMusic(button, song) {
	if (song.paused) {
		button.html('MUSIC ON').css('background-color','green');
		song.play();
		if (localStorage) {
			localStorage.setItem("music", '1');
		}
	} else {
		button.html('MUSIC OFF').css('background-color','black');
		song.pause();
		if (localStorage) {
			localStorage.setItem("music", '0');
		}
	}
}

$(document).ready(function() {
	$('.dialog-close').click(function() {
		var dialogName = $(this).parent().parent().attr("id");
		$('#'+dialogName).dialog('close');
	});
});