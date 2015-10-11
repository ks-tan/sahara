Template.history.helpers({
	'plan': function(){
		sessionSummary = Sessions.find();
		return sessionSummary;
	}
});