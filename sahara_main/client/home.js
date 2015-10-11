Template.home.helpers ({
	sessionSummary: function() {
		var sessionSummary = Sessions.findOne({owner: Meteor.userId()}, {sort: {datetime: -1}});

		sessionSummary['datetime'] = datetimeToDisplayFormat(sessionSummary['datetime']);
		sessionSummary['respondBy'] = datetimeToDisplayFormat(sessionSummary['respondBy']);

		return sessionSummary;
	}
});

function datetimeToDisplayFormat(datetime) {
	var date = datetime.split("T")[0];
	var time = datetime.split("T")[1];

	return date + " " + time;
}