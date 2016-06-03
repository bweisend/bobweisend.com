// QUOTE
var quotes = [
	"Imagination is more important than knowledge.",
	"We die only once, and for such a long time.",
	"Even if you're on the right track, you'll get run over if you just sit there.",
	"Those who want to reap the benefits of this great nation must bear the fatigue of supporting it.",
	"Until lions have their historians, tales of the hunt shall always glorify the hunters.", 
	"Success in life has nothing to do with what you gain in life or accomplish for yourself. It's what you do for others.",
	"Precaution is better than cure.",
	"Most folks are about as happy as they make up their minds to be.",
	"People who hate hearing the truth rarely enjoy telling it.",
	"The good thing about science is that it's true whether or not you believe it.",
	"The only difference between men and boys is the price of their toys.",
	"What gets us into trouble is not what we don't know. It's what we know for sure that just ain't so.",
	"If you want to see the true measure of a man, watch how he treats his inferiors, not his equals.",
	"Don't judge each day by the harvest you reap, but by the seeds that you plant.",
	"Give to every human being every right that you claim for yourself.",
	"You can easily judge the character of a man by how he treats those who can do nothing for him.",
	"We are what we repeatedly do.",
	"You can always count on Americans to do the right thing -- after they've tried everything else.",
	"The best argument against democracy is a five-minute conversation with the average voter.",
	"If all you ever do is all you've ever done, then all you'll ever get is all you ever got.",
	"Those who love money will never have enough.",
	"We are punished by our sins, not for them.",
	"Wisdom begins with wonder",
	"There are two ways to be fooled. One is to believe what isn't true; the other is to refuse to accept what is true.",
	"People take different roads seeking fulfillment and happiness. Just because they're not on your road doesn't mean that they're lost.",
	"Be the change you wish to see in the world.",
	"In all science, error precedes the truth, and it is better it should go first than last.",
	"The saddest aspect of life right now is that science gathers knowledge faster than society gathers wisdom.",
	"To argue with a person who has renounced the use of reason is like administering medicine to the dead.",
	"What can be asserted without proof can be dismissed without proof.",
	"The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.",
	"Go to Heaven for the climate, Hell for the company."
];

// SOURCE
var sources = [
	"Albert Einstein",
	"Molière (1656)",
	"Will Rogers",
	"Thomas Paine",
	"African Proverb",
	"Danny Thomas",
	"Edward Coke",
	"Abraham Lincoln",
	"@hotdogsladies (via Twitter)",
	"Neil deGrasse Tyson",
	"Unknown",
	"Mark Twain",
	"J. K. Rowling",
	"Robert Louis Stevenson",
	"Robert Ingersoll",
	"James D. Miles",
	"Will Durant",
	"Winston Churchill",
	"Winston Churchill",
	"Unknown",
	"Ecclesiastes (5:10)",
	"Elbert Hubbard",
	"Socrates",
	"Soren Kierkegaard",
	"Dalai Lama",
	"Mahatma Gandhi",
	"Hugh Walpole",
	"Isaac Asimov",
	"Thomas Paine",
	"Christopher Hitchens (1949-2011)",
	"Friedrich Nietzsche",
	"Mark Twain"
];

// preload audio
var quoteSound = new Audio("quotes.mp3");

$(document).ready(function() {
	var thisQuote = 0;
	var qInterval;
	var QUOTE_INTERVAL = 10000; // time between quotes
	var FADE_INTERVAL = 2000; // fade quote speed

	var tempArray = [];
	for (var i=0; i<quotes.length; i++) {
		tempArray[i] = i;
	}

	function requestFullScreen(element) {
		if (!document.fullscreenElement &&    // alternative standard method
		!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
			// Supports most browsers and their versions
			var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

			if (requestMethod) { // Native full screen
				requestMethod.call(element);
			} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
				var wscript = new ActiveXObject("WScript.Shell");
				if (wscript !== null) {
					wscript.SendKeys("{F11}");
				}
			}
			$('#fullscreen').html("EXIT FULL SCREEN");
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
			$('#fullscreen').html("FULL SCREEN");
		}
	}
	
	function rotateQuote() {
		if (thisQuote <= quotes.length) {
			var w = $('.wrapper');
			var q = $('q');
			var s = $('.source');
			
			// fade out, change content, then fade in
			w.fadeOut(FADE_INTERVAL, function() {
				q.html(quotes[tempArray[thisQuote]]);
				s.html(sources[tempArray[thisQuote]]);
				thisQuote++;
				w.fadeIn(FADE_INTERVAL);
			});
		} else {
			clearInterval(qInterval);
			startQuoteShow();
		}
	}

	function startQuoteShow() {
		shuffle(tempArray);
		thisQuote = 0;
		rotateQuote();
		qInterval = setInterval(rotateQuote, QUOTE_INTERVAL);
	}

	$('#fullscreen').click(function() {
		requestFullScreen(document.body);
	});
	
	$('#music').click(function() {
		toggleMusic($(this), quoteSound);
	});
	
	// start the show!
	startQuoteShow();

	// start the music!
	//quoteSound.play();
	// play music if localstorage is missing or set to 1
	if (localStorage) {
		var music = localStorage.getItem('music');
		if (music == '1') {
			playMusic(quoteSound);
			$('#music').html('MUSIC ON').css('background-color','green');
		} else if (music == undefined) {
			playMusic(quoteSound);
			$('#music').html('MUSIC ON').css('background-color','green');
			localStorage.setItem("music", '1');
		} else if (music == '0') {
			$('#music').html('MUSIC OFF').css('background-color','black');
		}
	}
	
});