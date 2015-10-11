Template.home.helpers ({
	sessionSummary: function() {
		var now = new Date();
		var sessionUserOwn = Sessions.findOne({ owner: Meteor.userId(), datetime: { $gt: now.getTime()}}, {sort: {datetime: 1}});
		var sessionUserParticipate = Sessions.findOne({ rsvpYes: Meteor.userId() , datetime: { $gt: now.getTime()}}, {sort: {datetime: 1}});
		
		if (sessionUserOwn['datetime'] < sessionUserParticipate['datetime']) {
			return sessionUserOwn;
		} else {
			return sessionUserParticipate;
		}
	},
	hasPlan: function(){
		var now = new Date();
		var sessionUserOwn = Sessions.findOne({ owner: Meteor.userId(), datetime: { $gt: now.getTime()}}, {sort: {datetime: 1}});
		var sessionUserParticipate = Sessions.findOne({ rsvpYes: Meteor.userId() , datetime: { $gt: now.getTime()}}, {sort: {datetime: 1}});
		
		return typeof sessionUserOwn !== 'undefined' | typeof sessionUserParticipate !== 'undefined';
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
	console.log(result);
	return result;
});

