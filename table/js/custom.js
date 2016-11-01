function tableFeatures() {

	// Add class name to span to display team logos
	var $teamLogo = $('.team-logo');

	$(".team:contains('Geelong')").addClass('cats');
	$(".team:contains('Port Adelaide')").addClass('power');
	$(".team:contains('Sydney Swans')").addClass('swans');
	$(".team:contains('Collingood')").addClass('magpies');
	$(".team:contains('Western Bulldogs')").addClass('bulldogs');

	$teamLogo.css('opacity', 1);

	// Replace Uppercase text in JSON to Capitalised
	$(".position").text(function () {
		return $(this).text().replace("MIDFIELDER", "Midfielder").replace("FORWARD", "Forward");
	});
}

$(document).ready(function () {
	
	// Setup table body
	var tableBody = $('#player-rows');

	// Get ratings data and format table html
	$.getJSON('ratings.json', function (data) {
		var items = data.playerRatings.map(function (item) {
			return '<tr>' +
			'<td class="player rank"><span>' + item.detailedRatings[0]["ranking"] + '</span></td>' +
			'<td class="player name">' + item.player.playerName.givenName + ' ' + item.player.playerName.surname + '</td>' +
			'<td class="player team">' + '<span class="team-logo"></span>' + item.team.teamName + '</td>' +
			'<td class="player position">' + item.position + '</td></tr>';
		});

		tableBody.empty();

		// Append table html to table body
		if (items.length) {
			var content = items.join();
			var list = tableBody.html(content);
			tableBody.append(list);
		}

	});

	tableBody.text('Loading the JSON file.');
	
	setTimeout(tableFeatures, 50);

});


$(document).ready(function () {
	// Show alt version animation
	var $button = $('.button-container');
	var $classicRatings = $('.afl');
	var $alternate = $('.alt-version');

	var buttonShow = new TimelineLite();

	buttonShow.delay(2);

	buttonShow.to($button, 1, {y: '-=130', autoAlpha: 1, ease:Power4.easeOut}) // no comma or semi-colon
	;

	var altShow = new TimelineMax({
		onComplete: altTable
	});

	altShow.pause();
	altShow.to($button, 0.5, {autoAlpha: 0, ease:Power2.easeOut})
	altShow.to($classicRatings, 1, {autoAlpha: 0, display:'none', ease:Power2.easeOut})
	altShow.to($alternate, 1, {autoAlpha: 1, display:'block', ease:Power2.easeOut})
	;



	$( "#next" ).click(function() {
	  altShow.play();
	});
});


function altTable() {
	// Setup table body
	var playerInfo = $('#player-info');

	// Get ratings data and format table html
	$.getJSON('ratings.json', function (data) {
		var items = data.playerRatings.map(function (item) {
			return '<div class="row"><div class="one columns rank"><span>' + item.detailedRatings[0]["ranking"] + '</span></div>' +
			'<div class="four columns name">' + item.player.playerName.givenName + ' ' + item.player.playerName.surname + '</div>' +
			'<div class="four columns team">' + '<span class="team-logo"></span>' + item.team.teamName + '</div>' +
			'<div class="three columns position">' + item.position + '</div></div>';
		});

		playerInfo.empty();

		// Append table html to table body
		if (items.length) {
			var content = items.join();
			var list = playerInfo.html(content);
			playerInfo.append(list);
		}

	});

	playerInfo.text('Loading the JSON file.');
	
	setTimeout(tableFeatures, 50);
	
}












































