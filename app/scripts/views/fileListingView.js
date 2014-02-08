var fileListingView = Backbone.View.extend({
    events: {

    },

    template: _.template('<% _.each(images, function(img) { %> <li><img src="<%= img.data %>" width="100" height="100" /><span><%= img.id %></span></li> <% }); %>'),

    render: function () {
        console.log("rendering", this.model, this.model.toJSON());
        this.$el.html(this.template({
            images: this.model.toJSON()
        }));
    },

    initialize: function (options) {

        this.listenTo(this.model, 'add', this.render);
        this.listenTo(this.model, 'remove', this.render);
        this.listenTo(this.model, 'reset', this.render);
    }
});