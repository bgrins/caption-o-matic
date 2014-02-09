var editorView = Backbone.View.extend({

    events: {
        'input input': 'updateLine',
        'change input': 'updateLine',
        'change select': 'updateLine'
    },

    _slug: "",
    _textTop: "",
    textBottom: "",

    updateLine: function (ev) {
        this.updateLineByNumber($(ev.target).closest("[data-line]").data("line"));
    },

    updateLineByNumber: function(lineId) {
        var controls = this.$("[data-line=" + lineId + "]"),
            valueInput = controls.find(".line-box"),
            fontInput = controls.find(".text-font"),
            colorInput = controls.find(".text-color"),
            font = fontInput.val(),
            line = controls.data('line'),
            color = colorInput.spectrum("get").toHexString(),
            val = valueInput.val();

        if (lineId == "1") {
            this._textTop = val;
        } else {
            this._textBottom = val;
        }

        this.kineticView['drawLine' + lineId](val, color, font);
        this.buildHash();
    },

    buildHash: function() {
        console.log("Building hash", this._slug, this._textTop, this._textBottom);

        var hash = "#";

        hash += this._slug;

        if (this._textTop) {
            hash += "/" + encodeURIComponent(this._textTop); //.replace(/\%20/g, " ");
        }
        if (this._textBottom) {
            hash += "/" + encodeURIComponent(this._textBottom); //.replace(/\%20/g, " ");
        }

        this.$("#edit-this-caption").attr("href", hash);
    },

    loadImage: function(img, textTop, textBottom, slug) {
        console.log(textTop, textBottom, slug)
        this._slug = slug;
        this.kineticView.drawImage(img);
        this.buildHash();
        $("body").addClass("editing");

        // TODO: keep track of current default text and clear it if it is still
        // set when switching images
        var topTextInput = this.$("[data-line=1]").find(".line-box");
        if (textTop && !topTextInput.val()) {
            topTextInput.val(textTop);
        }

        var bottomTextInput = this.$("[data-line=2]").find(".line-box");
        if (textBottom && !bottomTextInput.val()) {
            bottomTextInput.val(textBottom);
        }

        topTextInput.trigger('change');
        bottomTextInput.trigger('change');
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
            palette:
                [["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]]
        });

        /*this.canvasView = new canvasView({
            el: this.$el.find('.canvas-wrap')
        });*/
    }
});