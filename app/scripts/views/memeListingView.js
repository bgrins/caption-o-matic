
var memeCollection = new Backbone.Collection([
  {
    src: "images/memes/ancient-aliens.jpg",
    description: "",
    link: "",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: ""
  },
  {
    src: "images/memes/bad-luck-brian.jpg",
    description: "",
    link: "",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: ""
  },
  {
    src: "images/memes/conspiracy-keanu.jpg",
    description: "",
    link: "",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: ""
  },
  {
    src: "images/memes/doge.jpg",
    description: "",
    link: "",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: ""
  },
  {
    src: "images/memes/first-world-problems.jpg",
    description: "",
    link: "",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: ""
  },
  {
    src: "images/memes/futurama-fry.jpg",
    description: "",
    link: "",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: ""
  },
  {
    src: "images/memes/most-interesting.jpg",
    description: "",
    link: "",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: ""
  },
  {
    src: "images/memes/no-time-for-that.jpg",
    description: "",
    link: "",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: ""
  },
  {
    src: "images/memes/one-does-not-simply.jpg",
    description: "",
    link: "",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: ""
  },
  {
    src: "images/memes/scumbag-steve.jpg",
    description: "",
    link: "",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: ""
  },
  {
    src: "images/memes/y-u-no.jpg",
    description: "",
    link: "",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: ""
  }
]);

var memeListingView = Backbone.View.extend({
    model: memeCollection,
    events: {
        'click img': "startEditing",
        'click .list-nav': 'navigateList'
    },

    template: _.template('<% _.each(images, function(img) { %> <li><img src="<%= img.src %>" /><span><%= img.link %></span></li> <% }); %>'),

    render: function () {
      this.$(".meme-listing").html(this.template({
          images: this.model.toJSON()
      }));

      // this.$(".meme-listing").html("<li>hi</li>");
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
        this.render();
        var width = 0;
        this.$ul = this.$("ul");
        this.$scrollable = this.$(".list-wrap");
        var li = this.$el.find("ul li").each(function() {
            width += $(this).outerWidth(true);
        });

        this.$ul.width(width);
    }
});