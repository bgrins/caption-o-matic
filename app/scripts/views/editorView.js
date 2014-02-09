var editorView = Backbone.View.extend({

    events: {
        'input input': 'updateLine',
        'change input': 'updateLine',
        'change select': 'updateLine'
    },

    updateLine: function (ev) {
        this.updateLineByNumber($(ev.target).closest("[data-line]").data("line"));
    },

    updateLineByNumber: function(lineId) {
        var controls = this.$("[data-line=" + lineId + "]"),
            valueInput = controls.find(".line-box"),
            fontInput = controls.find(".text-font"),
            colorInput = controls.find(".text-color"),
            line = controls.data('line'),
            val = valueInput.val(),
            font = fontInput.val(),
            color = colorInput.spectrum("get").toHexString();

        this.kineticView['drawLine' + lineId](val, color, font);
    },

    loadImage: function(img) {
        this.kineticView.drawImage(img);
    },

    initialize: function(options) {

        // TODO:
        // * Set tab order to navigate between inputs
        // * Allow editing of other properties (like font size)
        // * Allow adding / removing of extra text layers
        this.kineticView = new kineticView({
            el: this.$el.find('#canvas-wrap')
        });

        this.$(".text-color").spectrum({
            showPaletteOnly: true,
            palette: [
                ["red", "green", "white", "black"]
            ]
        });

        /*this.canvasView = new canvasView({
            el: this.$el.find('.canvas-wrap')
        });*/
    }
});