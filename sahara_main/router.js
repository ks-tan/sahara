Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/',{
	template: 'login'
});

Router.route('home',{
	template: 'home'
});

Router.route('create',{
	template: 'create'
});

Router.route('history',{
	template: 'history'
});

Router.route('/session/:_id', function() {
	if (this.ready()) {
		this.render('session', {
			data: function(){
				return Sessions.findOne({_id: this.params._id});
			}
		});
	}
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