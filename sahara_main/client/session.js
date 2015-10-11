Template.session.helpers({
	isNotDue: function() {
		var respondBy = Sessions.findOne({_id: this._id})['respondBy'];

		if (Date.parse(respondBy) > (new Date()).getTime()) {
			return true;
		}
		return false;
	}
});