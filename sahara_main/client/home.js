Template.home.helpers ({
	sessionSummary: function() {
		var now = new Date();
		return Sessions.findOne({ owner: Meteor.userId(), datetime: { $gt: now.getTime()}}, {sort: {datetime: 1}});
	},
	hasPlan: function(){
		var now = new Date();
		var sessionAfterNow = Sessions.findOne({ owner: Meteor.userId(), datetime: { $gt: now.getTime()}}, {sort: {datetime: 1}});

		return typeof sessionAfterNow !== 'undefined'
	}
});

Template.registerHelper('datetimeToDisplayFormat', function (datetime) {
	datetime = datetimeToDatetimeString(new Date(datetime));
	var date = datetime.split("T")[0];
	var time = datetime.split("T")[1];

	return date + " " + time;
});

Template.registerHelper('showNameWithFbId', function(ids) {
	var result = new Array();
	for (x in ids) {
		result.push(Meteor.users.findOne({_id: ids[x]})['profile']['name']);
	}

	return result;
});