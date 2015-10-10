Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/',{
	template: 'login'
});

Router.route('/user', {
	template: 'user'
});

Router.route('/feed',{
	template: 'feed'
});

Router.route('/bank',{
	template: 'bank'
});