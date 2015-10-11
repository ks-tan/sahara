Template.session.helpers({
	isNotDue: function() {
		var respondBy = Sessions.findOne({_id: this._id})['respondBy'];

		if (respondBy > (new Date()).getTime()) {
			return true;
		}
		return false;
	},

	isNotResponded: function() {
		var rsvp = Rsvps.findOne({userId: Meteor.userId(), sessionId: this._id});
		return typeof rsvp === 'undefined';
	}
});

Template.session.events({
	"click #rsvp-yes": function(){
		addRsvpToDatabase(this._id, true);
		Router.go("/session/" + this._id);
	},
	"click #rsvp-no": function(){
		addRsvpToDatabase(this._id, false);
		Router.go("/session/" + this._id);
	}
});	

function addRsvpToDatabase(sessionId, rsvp) {
	var arr = new Array();
	var sessionDatetime = Sessions.findOne({_id: this._id})['datetime'];
	Rsvps.insert({
		sessionId: sessionId,
		userId: Meteor.userId(),
		participate: rsvp,
		datetime: sessionDatetime
	});
}

function contains(arr, element) {
	return arr.indexOf(element) != -1;
}