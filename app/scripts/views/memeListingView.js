var memeListingView = Backbone.View.extend({
    events: {
        'click img': "startEditing"
    },

    render: function () {
    },

    startEditing: function(e) {
        window.staticshowdown.Views.editorView.loadImage(e.target);
    },

    initialize: function (options) {
    }
});