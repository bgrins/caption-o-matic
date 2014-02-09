var kineticView = Backbone.View.extend({
    events: {

    },

    drawLine: function (val, y, layer) {
        var opts = {
            fontFamily: "Open Sans",
            fontSize: 32,
            fontWeight: "300",
            fill: "#fff",
            lineHeight: "36",
            align: 'center',
            width: this.stage.getWidth(),
            shadowColor: 'black',
            shadowBlur: 0,
            shadowOffset: {x:1,y:1}
        };

        var text = new Kinetic.Text(_.extend({}, opts, {
            x: 0,
            y: y,
            text: val
        }));


        layer.removeChildren();
        console.log("Clearing layer", val, layer)
        layer.add(text);
        this.addLayers();
    },

    drawLine1: function(val) {
        this.drawLine(val, 50, this.text1Layer);
    },

    drawLine2: function(val) {
        this.drawLine(val, 350, this.text2Layer);
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

        this.imageLayer.clear();
        this.imageLayer.add(ki);
        this.addLayers();
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
        this.text1Layer = new Kinetic.Layer();
        this.text2Layer = new Kinetic.Layer();
    }
});