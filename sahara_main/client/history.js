Template.history.helpers({
	'plan': function(){
		sessionSummary = Sessions.find().fetch();
		for (x in sessionSummary) {
			var sessionId = sessionSummary[x]['_id'];
			sessionSummary[x]["rsvpYes"] = getRsvpYes(sessionId);
		}
		return sessionSummary;
	}
});

Template.history.events({
	"click button[type=submit]": function(event) {
		var id = $(event.target).prop("value");
		if ($(event.target).prop("id") == "sendInvites") {
			FB.ui({
				method: 'send',
				link:'http://sahara.meteor.com/session/' + id,
				display: 'iframe'
			});
		} else if ($(event.target).prop("id") == "deletePlan") {
			Sessions.remove(id);
		}
	}
});

Template.registerHelper('equals', function (a, b) {
      return a === b;
});