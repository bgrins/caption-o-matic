var editorView = Backbone.View.extend({

    events: {
        'input input': 'updateLine',
        'change input': 'updateLine',
        'change select': 'updateLine'
    },

    updateLine: function (ev) {
        var controls = $(ev.target).closest("[data-line]"),
            valueInput = controls.find(".line-box"),
            fontInput = controls.find(".text-font"),
            colorInput = controls.find(".text-color"),
            line = controls.data('line'),
            val = valueInput.val(),
            font = fontInput.val(),
            color = colorInput.spectrum("get").toHexString();

        this.kineticView['drawLine' + line](val, color, font);
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