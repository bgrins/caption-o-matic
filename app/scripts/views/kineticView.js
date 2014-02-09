var kineticView = Backbone.View.extend({
    events: {

    },

    drawLine: function (val, y) {
        var opts = {
            fontFamily: "Open Sans",
            fontSize: 32,
            fontWeight: "300",
            fill: "#fff",
            lineHeight: "36",
            align: 'center',
            width: this.width,
            shadowColor: 'black',
            shadowBlur: 0,
            shadowOffset: {x:1,y:1}
        };

        var text = new Kinetic.Text(_.extend({}, opts, {
            x: 0,
            y: y,
            text: val
        }));
        var layer = new Kinetic.Layer();
        layer.add(text);
        this.stage.add(layer);
    },

    drawLine1: function(val) {
        this.drawLine(val, 50);
    },

    drawLine2: function(val) {
        this.drawLine(val, 350);
    },

    drawImage: function (img) {

        var layer = new Kinetic.Layer();
        var i = new Image;
        i.onload = function() {
            var ki = new Kinetic.Image({
                x: 0,
                y: 0,
                width: i.width,
                height: i.height,
                image: i
            });

            layer.add(ki);
            this.stage.add(layer);
        }.bind(this);
        i.src = img.src;
    },

    initialize: function (options) {
        this.width = 400;
        this.stage = new Kinetic.Stage({
            container: this.$el.attr('id'),
            width: this.width,
            height: 400
        });
    }
});