Template.home.helpers ({
	sessionSummary: function() {
		var now = new Date();
		var sessionUserOwn = Sessions.findOne({ owner: Meteor.userId(), datetime: { $gt: now.getTime()}}, {sort: {datetime: 1}});
		var participatingSessionRsvp = Rsvps.findOne({ userId: Meteor.userId(), participate: true, datetime: { $gt: now.getTime()}}, {sort: {datetime: 1}});
		var participatingSession;
		if (typeof participatingSessionRsvp != 'undefined') {
			var participatingSessionId = participatingSessionRsvp['sessionId'];
			participatingSession = Sessions.findOne({ _id: participatingSessionId});
		}

		if (typeof participatingSession !== 'undefined') {
			if (sessionUserOwn['datetime'] < participatingSession['datetime']) {
				return sessionUserOwn;
			} else {
				return participatingSession;
			}
		} else {
			return sessionUserOwn;
		}
	},
	hasPlan: function(){
		var now = new Date();
		var sessionUserOwn = Sessions.findOne({ owner: Meteor.userId(), datetime: { $gt: now.getTime()}}, {sort: {datetime: 1}});
		var participatingSessionRsvp = Rsvps.findOne({ userId: Meteor.userId(), participate: true, datetime: { $gt: now.getTime()}}, {sort: {datetime: 1}});
		var participatingSession;
		if (typeof participatingSessionRsvp != 'undefined') {
			var participatingSessionId = participatingSessionRsvp['sessionId'];
			participatingSession = Sessions.findOne({ _id: participatingSessionId});
		}
		return typeof sessionUserOwn !== 'undefined' | typeof participatingSession !== 'undefined';
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

