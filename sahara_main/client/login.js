Template.login.events({
	'click #buttonLogin': function(event){
		Meteor.loginWithFacebook({
			requestPermissions: ['user_friends']
		}, function(err){
			if (err){
				throw new Meteor.Error("Facebook login failed");
			}
		});
	}
});