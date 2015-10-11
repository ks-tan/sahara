Template.recipe.events({
	"click .ingredientCard": function(event) {
		if (this.status === "inactive"){
			Ingredients.update(this._id,{$set: {status: "active"}});
		}else{
			Ingredients.update(this._id,{$set: {status: "inactive"}});
		}
	},
	"click #removeIcon": function(event) {
		Ingredients.remove({_id: this._id});
	},
	"submit .findRecipe": function(event) {
      	event.preventDefault();

      	var selectedIngredients = new Array();
      	var ingredients = Ingredients.find({userId: Meteor.user()._id}).fetch();
      	for (x in ingredients) {
      		console.log(ingredients[x].status);
      		if(ingredients[x].status === "active") {
      			selectedIngredients.push(ingredients[x]['ingredient']);
      		}
      	}
		
      	var url = "http://food2fork.com/api/search?key=38581ff9d82436e1bd417eab1d5cf0b0&q=";
      	for (x in selectedIngredients) {
      		url += selectedIngredients[x] + "%20";
      	}
      	console.log(url);
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
			recipeSummary['image_url'] = recipe.image_url;
			recipeSummaries.push(recipeSummary);
		}
		return recipeSummaries;
	},

	searchCompleted: function() {
		return typeof Session.get("recipeData") !== 'undefined';
	},

	ingredients: function() {
		return Ingredients.find({userId: Meteor.user()._id});
	},

	selectedClass: function() {
		if (this.status === 'active'){
			return 'selected';
		}else{
			return 'unselected';
		}
	}
});

Template.registerHelper('decodeUtf8', function(str){
	var elem = document.createElement('textarea');
	elem.innerHTML = str;
	return elem.value;
});