var musicArray = [
	'audio/Chukhung.mp3',
	'audio/Kobresia.mp3',
	'audio/Silene.mp3',
	'audio/TheThingsITellYou.mp3'
];

var qMap = {
	q1: "<div class='level2'>" +
			"<div class='inner inner25' id='webdev'><span>WEB DEVELOPER</span></div>" +
			"<div class='inner inner25' id='manager'><span>MANAGER</span></div>" +
			"<div class='inner inner25' id='website'><span>MY WEBSITE</span></div>" +
			"<div class='inner inner25' id='resume'><span>RÉSUMÉ</span></div>" +
		"</div>",
	q2: "<div class='level2'>" +
			"<div class='inner inner50' id='simon'><span>SIMON SAYS</span></div>" +
			"<div class='inner inner50' id='order'><span>DRAGGIN'</span></div>" +
		"</div>",
	q3: "<div class='level2'>" +
			"<div class='inner inner25' id='interests'><span>WHO AM I?</span></div>" +
			"<div class='inner inner25' id='quotes'><span>QUOTES</span></div>" +
			"<div class='inner inner25' id='pictures'><span>PICTURES</span></div>" +
			"<div class='inner inner25' id='kcpr'><span>DISC JOCKEY</span></div>" +
		"</div>",
	q4: "<div class='level2'>" +
			"<div class='inner inner33' id='email'>" +
				"<img class='contactImg' src='img/contact/email.JPG'>EMAIL" +
			"</div>" +
			"<div class='inner inner33' id='linkedin'>" +
				"<img class='contactImg' src='img/contact/linkedin.JPG'>LINKEDIN" +
			"</div>" +
			"<div class='inner inner33' id='facebook'>" +
				"<img class='contactImg' src='img/contact/facebook.JPG'>FACEBOOK" +
			"</div>" +
		"</div>",
};
var homeSong;

$(document).ready(function() {
	// fade speed
	var fadeIt = 350;
	
	// hide while jquery code is working
	//$('#wrapper').hide();
	
	// toggle music on/off
	$('#volume').click(function() {
		toggleMusic($(this), homeSong);
	});
	
	// replace content of q1->q4 when clicked
	$('section').click(function() {
		var q = $(this).attr('id');
		var contents = $(this).find('span');
		contents.fadeOut(fadeIt, function() {
			contents.html(qMap[q]).slideDown('slow');
			handleClicks(q);
			$('#'+q).off('click');
		});
	});

	function openDialog(source, content, width) {
		var wrapperWidth = $('#wrapper').width();
		var duration = 800;
		var d = $(content).dialog({
			autoOpen: false,
			modal: true,
			width: width || Math.min(wrapperWidth, (wrapperWidth-((wrapperWidth-640)/2))),
			resizable: false,
			draggable: false,
			show: {
				effect: 'fade',
				duration: duration,
			},
			hide: {
				effect: 'fade',
				duration: duration,
			}
		});

		d.dialog('open');

		$(source).effect('transfer', {
			to: d.dialog('widget'),
			className: 'ui-effects-transfer'
		}, duration, null);
	}

	// click handlers for inner content
	function handleClicks(section) {
		if (section === 'q3') {
			$('#interests').on('click', function () {
				openDialog('#interests','#interests2');
			});	
			$('#quotes').on('click', function () {
				location = 'quotes/quotes.html';
			});
			$('#pictures').on('click', function () {
				openDialog('#pictures','#pictures2', 300);
			});	
			$('#kcpr').on('click', function () {
				var kcpr = $('#kcpr').find('span');
				kcpr.fadeOut(fadeIt, function() {
					kcpr.html("" +
						"<div class='level3'>" +
							"<span>At Cal Poly, I was a DJ at KCPR 91.3 FM...</span><br/>" +
							"<audio id='audio' controls>" +
								"<source src='audio/kcpr.mp3' type='audio/mpeg'/>" +
								"Use a modern browser, pal." +
							"</audio>" +
						"</div>" +
					"").slideDown('slow');
					$('#kcpr').off('click');
				});
			});	
		} else if (section === 'q4') {
			$('#email').on('click', function () {
				location = 'mailto:bweisend@gmail.com?subject=I%20love%20your%20website';
			});	
			$('#linkedin').on('click', function () {
				window.open('http://www.linkedin.com/in/bweisend');
			});	
			$('#facebook').on('click', function () {
				window.open('http://www.facebook.com/weisguy');
			});	
		} else if (section === 'q1') {
			$('#webdev').on('click', function () {
				openDialog('#webdev','#webdev2');
			});	
			$('#manager').on('click', function () {
				openDialog('#manager','#manager2');
			});	
			$('#website').on('click', function () {
				openDialog('#website','#website2');
			});	
			$('#resume').on('click', function () {
				var resume = $('#resume').find('span');
				resume.fadeOut(fadeIt, function() {
					resume.html("" +
						"<div class='level3'>" +
							"<a target='resume' href='resume/Resume%20-%20Bob%20Weisend.pdf'><img class='resumeImg' src='img/resume/pdf.png'/></a>" +
							"<a target='resume' href='resume/Resume%20-%20Bob%20Weisend.docx'><img class='resumeImg' src='img/resume/docx.png'/></a>" +
							"<a target='resume' href='resume/resume.txt'><img class='resumeImg' src='img/resume/txt.png'/></a>" +
						"</div>" +
					"").slideDown('slow');
					$('#resume').off('click');
				});
			});	
		} else if (section === 'q2') {
			$('#simon').on('click', function () {
				location = 'simon/simon.html';
			});	
			$('#order').on('click', function () {
				var order = $('#order').find('span');
				order.fadeOut(fadeIt, function() {
					order.html("" +
						"<div class='level3'>" +
						"<span>Draggin' only works with a mouse or other pointing device.</span><br/><br/>" +
						"<a style='background-color: black' class='button' href='order/order.html'>PLAY DRAGGIN'</a>" +
					"</div>").slideDown('slow');
					$('#order').off('click');
				});
			});	
		}
		
		// hover effect for inner divs
		$('.inner').hover(function() {
			$(this).css('color','red');
		}, function() {
			$(this).css('color','white');
		});
	}
	
	// play music if localstorage is set to 1
	homeSong = new Audio(musicArray[generateNum(4)-1]);
	if (localStorage) {
		var music = localStorage.getItem('music');
		if (music == '1') {
			playMusic(homeSong);
			$('#volume').html('MUSIC ON').css('background-color','green');
		} else {
			$('#volume').html('MUSIC OFF').css('background-color','black');
			localStorage.setItem("music", '0');
		}
	} else {
		$('#volume').html('MUSIC OFF').css('background-color','black');
	}

	// fade it all in...
	//$('#wrapper').fadeIn(1700);
});