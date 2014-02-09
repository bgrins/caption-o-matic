var memeListingView = Backbone.View.extend({
    events: {
        'click img': "startEditing",
        'click .list-nav': 'navigateList'
    },

    render: function () {
    },

    navigateList: function (ev) {
        ev.preventDefault();
        var link = $(ev.target);
        var amt = this.$scrollable.width();
        var cur = this.$scrollable.scrollLeft();
        var maxScroll = this.$ul.width();

        if (link.is('.list-nav-back')) {
            amt = -1 * amt;
        }

        var dest = amt + cur;
        dest = Math.min(Math.max(0, dest), maxScroll);
        this.$scrollable.animate({scrollLeft: dest });
    },

    startEditing: function(e) {
        window.staticshowdown.Views.editorView.loadImage(e.target);
    },

    initialize: function (options) {
        var width = 0;
        this.$ul = this.$("ul");
        this.$scrollable = this.$(".list-wrap");
        var li = this.$el.find("ul li").each(function() {
            width += $(this).outerWidth(true);
        });

        this.$ul.width(width);
    }
});