var editorView = Backbone.View.extend({

    events: {
        'input input.line-box': 'updateLine',
        'change input.text-color': 'updateLine'
    },

    updateLine: function (ev) {
        var controls = $(ev.target).closest("[data-line]"),
            valueInput = controls.find(".line-box"),
            colorInput = controls.find(".text-color"),
            line = controls.data('line'),
            val = valueInput.val(),
            color = colorInput.spectrum("get").toHexString();

        this.kineticView['drawLine' + line](val, color);
    },

    loadImage: function(img) {
        this.kineticView.drawImage(img);
    },

    initialize: function(options) {

        this.kineticView = new kineticView({
            el: this.$el.find('#canvas-wrap')
        });

        this.$(".text-color").spectrum({
            showPaletteOnly: true,
            palette: [
                ["red", "green", "white", "black"]
            ]
        })
        /*this.canvasView = new canvasView({
            el: this.$el.find('.canvas-wrap')
        });*/
    }
});