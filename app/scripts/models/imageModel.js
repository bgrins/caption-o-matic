var ImageModel = Backbone.Model.extend({
	defaults: {
		id: '',
		userID: '',
		data: ''
	}
});

var ImageCollection = Backbone.Firebase.Collection.extend({
	model: ImageModel,

    firebase: new Firebase("https://chalupabatman.firebaseio.com/Images")
});