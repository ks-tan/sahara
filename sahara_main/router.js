Router.configure({
	layoutTemplate: 'layout',

});

Router.route('/',{
	template: 'login'
});

Router.map(function() {

	Router.route('home',{
		template: 'home'
	});

	Router.route('create',{
		template: 'create'
	});

	Router.route('history',{
		template: 'history'
	});
});

var requireLogin = function() { 
	if (! Meteor.user()) {
	    // If user is not logged in render landingpage
	    this.render('login'); 
	} else {
		//if user is logged in render whatever route was requested
	    this.next(); 
	}
}

Router.onBeforeAction(requireLogin, {except: ['login']});
