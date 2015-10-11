Template.home.helpers ({
	sessionSummary: function() {
		return Sessions.findOne({owner: Meteor.userId()}, {sort: {datetime: -1}});
	}
});

Template.registerHelper('datetimeToDisplayFormat', function (datetime) {
	var date = datetime.split("T")[0];
	var time = datetime.split("T")[1];

	return date + " " + time;
});