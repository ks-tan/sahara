Template.session.helpers({
	isNotDue: function() {
		var respondBy = Sessions.findOne({_id: this._id})['respondBy'];

		if (respondBy > (new Date()).getTime()) {
			return true;
		}
		return false;
	},

	isNotResponded: function() {
		var arr = new Array();
		var rsvpYes = Sessions.findOne({_id: this._id})['rsvpYes'];
		var rsvpNo = Sessions.findOne({_id: this._id})['rsvpNo'];
		if (rsvpYes !== 'undefined') {
			arr = arr.concat(rsvpYes);
		}
		if (rsvpNo !== 'undefined') {
			arr = arr.concat(rsvpNo);
		}
		return !contains(arr, Meteor.userId());
	}
});

Template.session.events({
	"click #rsvp-yes": function(event){
		addRsvpToDatabase(this._id, true);
		Router.go("/session/" + this._id);
	},
	"click #rsvp-no": function(event){
		addRsvpToDatabase(this._id, false);
		Router.go("/session/" + this._id);
	}
});	

function addRsvpToDatabase(id, rsvp) {
	var arr = new Array();
	if (rsvp) {
		if (typeof Sessions.findOne({_id: id})['rsvpYes'] !== 'undefined') {
			arr = Sessions.findOne({_id: id})['rsvpYes'];
		}

		if (!contains(arr, Meteor.userId())) {
			arr.push(Meteor.userId());	
		}
		
		Sessions.update(id, {
	        $set: {rsvpYes: arr}
	    });
	} else {
		if (typeof Sessions.findOne({_id: id})['rsvpNo'] !== 'undefined') {
			arr = Sessions.findOne({_id: id})['rsvpNo'];
		}

		if (!contains(arr, Meteor.userId())) {
			arr.push(Meteor.userId());	
		}

		Sessions.update(id, {
	        $set: {rsvpNo: arr}
	    });
	}
}

function contains(arr, element) {
	return arr.indexOf(element) != -1;
}