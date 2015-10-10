
Template.login.events({
	'click #facebook-login': function(event){
		Meteor.loginWithFacebook({
			requestPermissions: ['user_friends']
		}, function(err){
			if (err){
				throw new Meteor.Error("Facebook login failed");
			}
			Router.go('feed');
		});
	}
});

Template.navigationBar.events({
	'click #logout': function(event){
		Meteor.logout(function(err){
			if (err) {
				throw new Meteor.Error("Logout failed");
			}
			Router.go('/');
		});
	}
});

Template.addItemForm.events({
	'submit form': function(event){
		event.preventDefault();
		var userEmail = Meteor.user().services.facebook.email;
		var itemName = event.target.itemName.value;
		var itemPrice = event.target.itemPrice.value;
		event.target.itemName.value = "";
		event.target.itemPrice.value = "";
		Inventory.insert({email: userEmail, name: itemName, price: itemPrice});
	}
});

Template.inventoryList.helpers({
	'item': function(){
		var userEmail = Meteor.user().services.facebook.email;
		return Inventory.find({email: userEmail});
	}
});

Template.inventoryList.events({
	'click #removeItem': function(event){
		event.preventDefault();
		Inventory.remove({_id: this._id});
	}
});

Template.productsList.helpers({
	'item': function(){
		var userEmail = Meteor.user().services.facebook.email;
		return Inventory.find({email: {$ne: userEmail}});
	}
});

Template.productsList.events({
	'click #snapOrder': function(event){
		event.preventDefault();
		var item = Inventory.find({_id: this._id}).fetch()[0]; //this line don't work?? item is undefined
		var name = item['name'];
		console.log("TEST: " + name);
		var price = item['price'];
		var sellerEmail = item['email'];
		var buyerEmail = Meteor.user().services.facebook.email;
		Transactions.insert({
			sellerEmail: sellerEmail,
			buyerEmail: buyerEmail,
			name: name,
			price: price
		});
		Inventory.remove({_id: this._id});
	}
});






