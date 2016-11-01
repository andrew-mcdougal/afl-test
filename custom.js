function tableFeatures() {

	// Add class name to span to display team logos
	var $teamLogo = $('.team-logo');

	$("td.team:contains('Geelong')").addClass('cats');
	$("td.team:contains('Port Adelaide')").addClass('power');
	$("td.team:contains('Sydney Swans')").addClass('swans');
	$("td.team:contains('Collingood')").addClass('magpies');
	$("td.team:contains('Western Bulldogs')").addClass('bulldogs');

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
			'<td class="player rank">' + item.detailedRatings[0]["ranking"] + '</td>' +
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