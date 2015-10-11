
Template.create.helpers ({
	now: function() {
		return datetimeToDatetimeString(new Date);
	}
});

datetimeToDatetimeString = function(date) {
	var month = (date.getMonth() + 1);
	//prepend '0' if one digit month
	if (month < 10) {
		month = '0' + month
	}
	
	var day = date.getDate();
	//prepend '0' if one digit day
	if (day < 10) {
		day = '0' + day;
	}

	var hour = date.getHours();
	//prepend '0' if one digit hour
	if (hour < 10) {
		hour = '0' + hour;
	}

	var minute = date.getMinutes();
	//prepend '0' if one digit minute
	if (minute < 10) {
		minute = '0' + minute;
	}
	return date.getFullYear() + '-' + month + '-' 
				+ day + 'T' + hour + ":" + minute;
};

Template.create.events({
	'submit .new-session': function(event) {
		event.preventDefault();
		var datetime = Date.parse(event.target.datetime.value);
		var respondBy = Date.parse(event.target.respondByDatetime.value);
		var mealType = event.target.mealType.value;
		var description = event.target.description.value;

		Sessions.insert({
			owner: Meteor.userId(),
			datetime: datetime,
			respondBy: respondBy,
			mealType: mealType,
			description: description
		}, function (err, id) {
			console.log(id)
			FB.ui({
				method: 'send',
				message: id,
				link:'https://www.google.com/#' + id
			});
		}
		);

		Router.go('home')
	}
});

window.fbAsyncInit = function() {
	FB.init({
		appId      : '462748187260964',
		xfbml      : true,
		version    : 'v2.4'
	});
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));