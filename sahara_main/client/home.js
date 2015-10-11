Template.home.helpers ({
	sessionSummary: function() {
		return Sessions.findOne({owner: Meteor.userId()}, {sort: {datetime: -1}});
	},

	hasPlan: function(){
		var latestSessionDatetime = Sessions.findOne({owner: Meteor.userId()}, {sort: {datetime: -1}})['datetime'];
		var currentDate = new Date();
		currentDate.setHours(0,0,0,0);
		
		if (Date.parse(latestSessionDatetime) > currentDate.getTime()) {
			return true
		}
		return false;
	}
});

Template.home.events ({
	"click #buttonMakePlan": function(){
		Router.go('create');
	}
});

Template.registerHelper('datetimeToDisplayFormat', function (datetime) {
	var date = datetime.split("T")[0];
	var time = datetime.split("T")[1];

	return date + " " + time;
});