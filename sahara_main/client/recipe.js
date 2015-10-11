Template.recipe.events({
	// "submit .findRecipe": function(event) {
 //      	event.preventDefault();
	// 	var ingredient1 = event.target.ingredient1.value;
	// 	var ingredient2 = event.target.ingredient2.value;
	// 	var ingredient3 = event.target.ingredient3.value;
	// 	var ingredient4 = event.target.ingredient4.value;
	// 	var ingredient5 = event.target.ingredient5.value;

	// 	var url = "http://food2fork.com/api/search?key=2b098e10cdcd90fb4fa9b743e644565f&q=";
	// 	url += ingredient1 + "%20" + ingredient2 + "%20" + ingredient3 + "%20" + ingredient4 + "%20" + ingredient5;

	// 	Meteor.call("findRecipes", url, function(err, data){
	// 		if (err) console.log(err);
	// 		var recipes = JSON.parse(data).recipes;
	// 		var recipeIds = new Array();

	// 		for (x in recipes) {
	// 			recipeIds.push(recipes[x].recipe_id);
	// 		}

	// 		for (x in recipeIds) {
	// 			url = "http://food2fork.com/api/get?key=2b098e10cdcd90fb4fa9b743e644565f&rId=";
	// 			url += recipeIds[x];

	// 			var arr = new Array();
	// 			Meteor.call("getRecipe", url, function(err, data){
	// 				if (err) console.log(err);
	// 				console.log(data);
	// 				arr.push(data);
	// 				Session.set("recipeData", arr);
	// 			});
	// 		}
	// 	});
	// },
	"submit .addIngredient": function(event) {
		event.preventDefault();
		var ingredientInput = event.target.ingredient.value;
		event.target.ingredient.value = "";
		Ingredients.insert({ingredient: ingredientInput, userId: Meteor.user()._id});

		var url = "http://food2fork.com/api/search?key=2b098e10cdcd90fb4fa9b743e644565f&q=" + ingredientInput;
		httpGetRecipe(url);
	},
	"click #getRecipe": function(event){
		var url = "http://food2fork.com/api/search?key=2b098e10cdcd90fb4fa9b743e644565f&q=" + this.ingredient;
		httpGetRecipe(url);
	}
})

function httpGetRecipe (url){
	Meteor.call("findRecipes", url, function(err, data){
			if (err) console.log(err);
			var recipes = JSON.parse(data).recipes;
			var recipeIds = new Array();

			for (x in recipes) {
				recipeIds.push(recipes[x].recipe_id);
			}

			for (x in recipeIds) {
				url = "http://food2fork.com/api/get?key=2b098e10cdcd90fb4fa9b743e644565f&rId=";
				url += recipeIds[x];

				var arr = new Array();
				Meteor.call("getRecipe", url, function(err, data){
					if (err) console.log(err);
					console.log(data);
					arr.push(data);
					Session.set("recipeData", arr);
				});
			}
		});
}

Template.recipe.helpers({
	recipes: function() {
		var recipeData = Session.get("recipeData");
		var recipeSummaries = new Array();

		for (x in recipeData) {
			var recipeSummary = new Array();
			var recipe = JSON.parse(recipeData[x]).recipe;
			recipeSummary['title'] = recipe.title;
			recipeSummary['ingredients'] = recipe.ingredients;
			recipeSummaries.push(recipeSummary);
		}
		return recipeSummaries;
	},

	searchCompleted: function() {
		return typeof Session.get("recipeData") !== 'undefined';
	},

	ingredients: function() {
		return Ingredients.find({userId: Meteor.user()._id});
	}
});

Template.registerHelper('decodeUtf8', function(str){
	var elem = document.createElement('textarea');
	elem.innerHTML = str;
	return elem.value;
});