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