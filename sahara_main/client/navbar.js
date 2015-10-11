Template.navigationBar.events({
	"click #logout": function(){
		Meteor.logout();
	}
});