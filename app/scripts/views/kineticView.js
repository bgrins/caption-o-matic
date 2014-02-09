var kineticView = Backbone.View.extend({
    events: {

    },

    drawLine: function (options, layer) {
        var opts = _.extend({
            x: 0,
            y: 0,
            fontFamily: "Impact",
            fontSize: 40,
            fontWeight: "bold",
            fill: "#fff",
            align: 'center',
            width: this.stage.getWidth(),
            shadowColor: 'black',
            shadowBlur: 2,
            shadowOffset: {x:2, y:2},
        }, options);

        var text = new Kinetic.Text(opts);

        if ((text.attrs.y + text.getHeight()) > this.stage.getHeight()) {
            var newY = this.stage.getHeight() - text.getHeight();
            text.attrs.y = newY;
        }

        layer.removeChildren();
        layer.add(text);
        this.stage.draw();
    },

    drawLine1: function(val, color, font) {
        this.drawLine({
            text: val.toUpperCase(),
            y: 20,
            fill: color,
            fontFamily: font
        }, this.text1Layer);
    },

    drawLine2: function(val, color, font) {
        this.drawLine({
            text: val.toUpperCase(),
            y: this.stage.getHeight() - 50,
            fill: color,
            fontFamily: font
        }, this.text2Layer);
    },

    drawImage: function (img) {

        this.stage.setWidth(img.naturalWidth);
        this.stage.setHeight(img.naturalHeight);

        var ki = new Kinetic.Image({
            x: 0,
            y: 0,
            width: img.naturalWidth,
            height: img.naturalHeight,
            image: img
        });

        this.imageLayer.removeChildren();
        this.imageLayer.add(ki);
        this.stage.draw();
    },

    addLayers: function() {
        this.stage.clear();
        this.stage.add(this.imageLayer);
        this.stage.add(this.text1Layer);
        this.stage.add(this.text2Layer);
    },

    initialize: function (options) {
        this.stage = new Kinetic.Stage({
            container: this.$el.attr('id'),
            width: this.width,
            height: 400
        });
        this.imageLayer = new Kinetic.Layer();
        this.text1Layer = new Kinetic.Layer({
            draggable: true
        });
        this.text2Layer = new Kinetic.Layer({
            draggable: true
        });
        this.addLayers();
    }
});