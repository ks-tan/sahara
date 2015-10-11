Meteor.methods({
    "findRecipes": function (url) {
        this.unblock();
        return Meteor.http.call("GET", url)['content'];
    },

    "getRecipe": function (url) {
    	this.unblock();
    	return Meteor.http.call("GET", url)['content'];
    }
});