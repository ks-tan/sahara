Template.login.events({
	'click #buttonLogin': function(event){
		Meteor.loginWithFacebook({
			requestPermissions: ['user_friends'],
			loginStyle:"redirect",
			redirectUrl: "http://sahara.meteor.com/home"
		}, function(err){
			if (err){
				throw new Meteor.Error("Facebook login failed");
			}
		});
	}
});