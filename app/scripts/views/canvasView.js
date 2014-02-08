var canvasView = Backbone.View.extend({

    events: {
    },

    getTextOpts: function() {
        var c = this.canvas;
        var opts = {
            x: c.width / 2,
            boxWidth: c.width
        };
        return opts;
    },

    drawLine: function (val, y) {
        var opts = this.getTextOpts();
        this.canvasText.drawText(_.extend({}, opts, {
            y: y,
            text: val
        }));
    },

    drawLine1: function(val) {
        this.drawLine(val, 50);
    },

    drawLine2: function(val) {
        this.drawLine(val, 350);
    },

    drawText: function(line1, line2) {
        
        if (line1) {
            this.drawLine1(line1);
        }

        if (line2) {
            this.drawLine2(line2);
        }
        
    },

    drawImage: function (img) {
        var that = this;
        var url = img.src;
        var img = new Image;
        img.onload = function() {
            this.canvas.width = img.width;
            this.canvas.height = img.height;
            this.context.drawImage(img, 0, 0);
        }.bind(this);
        img.src = url;
    },

    initialize: function (options) {
        this.canvas = this.$el.find("canvas")[0];
        this.context = this.canvas.getContext('2d');
        this.canvasText = new CanvasText;
        this.canvasText.config({
            canvas: this.canvas, 
            context: this.context,
            fontFamily: "Open Sans",
            fontSize: "32px",
            fontWeight: "300",
            fontColor: "#fff",
            lineHeight: "36",
            textShadow: "10px 10px 0px #000",
            textAlign: 'center'
        });
    }
});