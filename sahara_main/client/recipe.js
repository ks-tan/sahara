Template.recipe.events({
	"submit .findRecipe": function(event) {
      	event.preventDefault();

      	var selectedIngredients = new Array();
      	var ingredients = Ingredients.find({userId: Meteor.user()._id}).fetch();
      	for (x in ingredients) {
      		var id = '#' + ingredients[x]['ingredient'];
      		if($(id).is(":checked")) {
      			selectedIngredients.push(ingredients[x]['ingredient']);
      		}
      	}
		
      	var url = "http://food2fork.com/api/search?key=38581ff9d82436e1bd417eab1d5cf0b0&q=";
      	for (x in selectedIngredients) {
      		url += selectedIngredients[x] + "%20";
      	}
      	httpGetRecipe(url);
    },
	"submit .addIngredient": function(event) {
		event.preventDefault();
		var ingredientInput = event.target.ingredient.value;
		ingredientInput = $.trim(ingredientInput);
		event.target.ingredient.value = "";

		var ingredients = Ingredients.find({userId: Meteor.user()._id}).fetch();
		var doesContainIngredient = false;
		for (x in ingredients) {
			if (ingredients[x]['ingredient'].toLowerCase() == ingredientInput.toLowerCase()) {
				return;
			}
		}

		Ingredients.insert({ingredient: ingredientInput, userId: Meteor.user()._id});
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
			url = "http://food2fork.com/api/get?key=38581ff9d82436e1bd417eab1d5cf0b0&rId=";
			url += recipeIds[x];

			var arr = new Array();
			Meteor.call("getRecipe", url, function(err, data){
				if (err) console.log(err);
				console.log(data);
				arr.push(data);
				console.log(arr);
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