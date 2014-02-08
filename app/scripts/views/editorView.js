var editorView = Backbone.View.extend({

	events: {
        'blur input.line-box': 'updateLine'
	},

	updateLine: function (ev) {
        var input = $(ev.target),
            line = input.data('line'),
            val = input.val();

        this.canvasView['drawLine' + line](val);
	},

	loadImage: function(img) {
		this.canvasView.drawImage(img);
	},

	initialize: function(options) {


		this.canvasView = new canvasView({
			el: this.$el.find('.canvas-wrap')
		});
	}
});