Template.history.helpers({
	'plan': function(){
		sessionSummary = Sessions.find();
		sessionSummary['datetime'] = datetimeToDisplayFormat(sessionSummary['datetime']);
		return sessionSummary;
	}
});