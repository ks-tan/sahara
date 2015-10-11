Template.history.helpers({
	'plan': function(){
		sessionSummary = Sessions.find();
		return sessionSummary;
	}
});

Template.history.events({
	"click button[type=submit]": function(event) {
		var id = $(event.target).prop("value");
		if ($(event.target).prop("id") == "sendInvites") {
			FB.ui({
				method: 'send',
				message: id,
				link:'http://sahara.meteor.com/session/' + id
			});
		} else if ($(event.target).prop("id") == "deletePlan") {
			Sessions.remove(id);
		}
	}
});

Template.registerHelper('equals', function (a, b) {
      return a === b;
});