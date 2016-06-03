var correctAudio = new Audio("correct.mp3");
var incorrectAudio = new Audio("incorrect.mp3");
var incorrect2Audio = new Audio("incorrect2.wav");
var hasAnswer = false;
var games = [
	{
		msg: 'Order the Johnny Depp movies by release date (oldest to newest)',
		items: [
			{
				img: 'depp4.jpg',
				desc: 'Charlie and the Chocolate Factory',
				answer: '2005',
				order: 0
			},
			{
				img: 'depp1.jpg',
				desc: 'Sweeney Todd',
				answer: '2007',
				order: 1
			},
			{
				img: 'depp2.jpg',
				desc: 'Alice In Wonderland',
				answer: '2010',
				order: 2
			},
			{
				img: 'depp3.jpg',
				desc: 'The Lone Ranger',
				answer: '2013',
				order: 3
			},
		]		
	},
	{
		msg: 'Order the teams by number of championships (most to fewest)',
		items: [
			{
				img: 'champ3.jpg',
				desc: 'New York Yankees',
				answer: '27',
				order: 0
			},
			{
				img: 'champ2.gif',
				desc: 'Montreal Canadiens',
				answer: '24',
				order: 1
			},
			{
				img: 'champ1.png',
				desc: 'Boston Celtics',
				answer: '17',
				order: 2
			},
			{
				img: 'champ4.jpg',
				desc: 'Green Bay Packers',
				answer: '13',
				order: 3
			},
		]		
	},
	{
		msg: 'Order the sitcoms by number of seasons (most to fewest)',
		items: [
			{
				img: 'sitcom1.jpg',
				desc: 'South Park',
				answer: '19',
				order: 0
			},
			{
				img: 'sitcom3.jpg',
				desc: 'Ozzie & Harriet',
				answer: '14',
				order: 1
			},
			{
				img: 'sitcom2.jpg',
				desc: 'Happy Days',
				answer: '11',
				order: 2
			},
			{
				img: 'sitcom4.jpg',
				desc: 'Everybody Loves Raymond',
				answer: '9',
				order: 3
			},
		]		
	},
	{
		msg: 'Order the Jane Austen novels by publication date (oldest to newest)',
		items: [
			{
				img: 'jane2.jpg',
				desc: 'Sense & Sensibility',
				answer: '1811',
				order: 0
			},
			{
				img: 'jane1.jpg',
				desc: 'Pride & Prejudice',
				answer: '1813',
				order: 1
			},
			{
				img: 'jane3.jpg',
				desc: 'Emma',
				answer: '1815',
				order: 2
			},
			{
				img: 'jane4.jpg',
				desc: 'Northanger Abbey',
				answer: '1817',
				order: 3
			},
		]		
	},
	{
		msg: 'Order these one-hit wonders by the year it charted (oldest to newest)',
		items: [
			{
				img: 'onehit4.jpg',
				desc: 'Whip It (Devo)',
				answer: '1980',
				order: 0
			},
			{
				img: 'onehit3.jpg',
				desc: 'Tainted Love (Soft Cell)',
				answer: '1982',
				order: 1
			},
			{
				img: 'onehit1.jpg',
				desc: 'Take On Me (A-Ha)',
				answer: '1985',
				order: 2
			},
			{
				img: 'onehit2.jpg',
				desc: 'I Wanna Be A Cowboy (Boys Don\'t Cry)',
				answer: '1986',
				order: 3
			},
		]		
	},
	{
		msg: 'Order these Star Wars movies by domestic (USA) box office revenue (most to least)',
		items: [
			{
				img: 'starwars2.jpg',
				desc: 'A New Hope',
				answer: '$460 million',
				order: 0
			},
			{
				img: 'starwars1.jpg',
				desc: 'Revenge of the Sith',
				answer: '$380 million',
				order: 1
			},
			{
				img: 'starwars4.jpg',
				desc: 'Return of the Jedi',
				answer: '$309 million',
				order: 2
			},
			{
				img: 'starwars3.jpg',
				desc: 'Attack of the Clones',
				answer: '$302 million',
				order: 3
			},
		]		
	},
];		

var gameArray = createRandomArray(games.length); // random order of games
var thisGame; // keeps track of user's selections
var tempArray; // keeps track of user's selections
var game;
var gameNum = -1;

$(document).ready(function() {

	$('.dropMe').droppable({
		hoverClass: 'hovered',
		drop: handleDropEvent
	});
	
	$('#checkYourAnswer').click(function() {
		var isCorrect = true;
		// check if user ordered items correctly (thisGame = [0,1,2,3])
		for (var i=0; i<thisGame.length; i++) {
			// display the data next to each item
			//$('#txtbox'+i).append(` (${game.items[tempArray[i]].answer})`);
			if (!hasAnswer) {
				$('#txtbox'+i).append(" (" + game.items[tempArray[i]].answer + ")");
			}
			if (thisGame[i] === i) {
				// correct pick
				$('#bottom'+i).css('background-color', 'green');
			} else {
				// incorrect pick
				$('#bottom'+i).css('background-color', 'darkred');
				isCorrect = false;
			}
		}
		hasAnswer = true;
		if (isCorrect) {
			correctAudio.play();
			$('#middle').html('YOU DID IT!! Nice job, smarty pants!');
		} else {
			incorrectAudio.play();
			incorrect2Audio.play();
			$('#middle').html('Sorry... you failed. Oh well, the world needs ditch diggers too!');
		}
		$('#checkYourAnswer').hide();
		if (gameNum+1 <	 games.length) {
			$('#playAgain').show();
		}
	});
	
	$('#playAgain').click(function() {
		nextGame();
	});
	
	function handleDropEvent(event, ui) {
		// record which item was dropped in thisGame array
		var dropNum = $(this).attr('dropNum');
		var dragNum = ui.draggable.data('dragNum');
		thisGame[dropNum] = dragNum;
		
		// snap to edge, disable drag & drop
		//ui.draggable.addClass( 'correct' );
		//ui.draggable.draggable( 'disable' );
		//$(this).droppable( 'disable' );
		ui.draggable.position({
			of: $(this),
			//my: 'left top',
			//at: 'left top'
		});
		ui.draggable.draggable( 'option', 'revert', false );
		
		// check if all four items are sorted
		if (userDone()) {
			$('#checkYourAnswer').show();
		}
	}
	
	function userDone() {
		for (var i=0; i<thisGame.length; i++) {
			if (thisGame[i] == undefined) {
				return false;
			}
		}
		return true;
	}
	
	function nextGame() {
		gameNum++;
		hasAnswer = false;
		game = games[gameArray[gameNum]];
		tempArray = createRandomArray(game.items.length); // randomize image order
		thisGame = new Array(game.items.length);

		// stop audio, reset to beginning of track
		if (gameNum > 0) {
			correctAudio.pause();
			correctAudio.currentTime = 0;
			incorrectAudio.pause();
			incorrectAudio.currentTime = 0;
		}
		
		// reset background colors for bottom boxes
		//$('.dropMe').css('background-color', 'initial');
		$('.dropMe').css('background-color', 'black');
		$('#playAgain').hide();

		// reset bottom
		$('#bottom0').html('1');
		$('#bottom1').html('2');
		$('#bottom2').html('3');
		$('#bottom3').html('4');

		// reset middle
		$('#middle').html(game.msg);

		// reset top
		$('#top0, #top1, #top2, #top3').empty();
		
		// set top		
		for (var i=0; i<4; i++) {
			$('<div></div>').data('dragNum', game.items[tempArray[i]].order).attr('id', 'card'+i ).appendTo('#top'+i).draggable( {
				cursor: 'move',
				revert: true,
			} );
			$('#card'+i).html("<div class='imgbox'><img height='235' src='img/" +game.items[tempArray[i]].img + "'/></div><div class='txtbox' id='txtbox"+i+"'>" + game.items[tempArray[i]].desc + "</div>");
		}		
	}
	
	var duration = 800;
	$('#instructions').dialog({
		autoOpen: true,
		modal: true,
		width: 500,
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

	nextGame();
	
	
});