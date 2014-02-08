var memeListingView = Backbone.View.extend({
    events: {
        'click img': "startEditing"
    },

    render: function () {
    },

    startEditing: function(e) {
        console.log("Editing started", e.target);
        window.staticshowdown.Views.canvasView.drawImage(e.target);
    },

    loadImageInCanvas: function(img) {

      var can = document.getElementById('canvas');
      var ctx = can.getContext('2d');

      can.width = img.width;
      can.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

    },

    initialize: function (options) {
        console.log("HERE", this.$el);

    }
});