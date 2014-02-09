var editorView = Backbone.View.extend({

    events: {
        'input input.line-box': 'updateLine'
    },

    updateLine: function (ev) {
        var input = $(ev.target),
            line = input.data('line'),
            val = input.val();

        this.kineticView['drawLine' + line](val);
    },

    loadImage: function(img) {
        this.kineticView.drawImage(img);
    },

    initialize: function(options) {

        this.kineticView = new kineticView({
            el: this.$el.find('#canvas-wrap')
        });
        /*this.canvasView = new canvasView({
            el: this.$el.find('.canvas-wrap')
        });*/
    }
});