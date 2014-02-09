
var memeCollection = new Backbone.Collection([
  {
    src: "images/memes/conspiracy-keanu.jpg",
    description: "Conspiracy Keanu",
    link: "http://knowyourmeme.com/memes/conspiracy-keanu",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: "conspiracy-keanu"
  },
  {
    src: "images/memes/ancient-aliens.jpg",
    description: "Ancient Aliens",
    link: "http://knowyourmeme.com/memes/ancient-aliens",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: "ancient-aliens"
  },
  {
    src: "images/memes/bad-luck-brian.jpg",
    description: "Bad Luck Brian",
    link: "http://knowyourmeme.com/memes/bad-luck-brian",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: "bad-luck-brian"
  },
  {
    src: "images/memes/doge.jpg",
    description: "Doge",
    link: "http://knowyourmeme.com/memes/doge",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: "doge"
  },
  {
    src: "images/memes/first-world-problems.jpg",
    description: "First world problems",
    link: "http://knowyourmeme.com/memes/first-world-problems",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: "first-world-problems"
  },
  {
    src: "images/memes/futurama-fry.jpg",
    description: "Futurama Fry",
    link: "http://knowyourmeme.com/memes/futurama-fry-not-sure-if",
    defaultTextTop: "Not sure if",
    defaultTextBottom: "",
    slug: "futurama-fry"
  },
  {
    src: "images/memes/most-interesting.jpg",
    description: "Most interesting man in the world",
    link: "http://knowyourmeme.com/memes/the-most-interesting-man-in-the-world",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: "most-interesting"
  },
  {
    src: "images/memes/no-time-for-that.jpg",
    description: "Ain't nobody got time for that",
    link: "http://knowyourmeme.com/memes/sweet-brown-aint-nobody-got-time-for-that",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: "no-time-for-that"
  },
  {
    src: "images/memes/one-does-not-simply.jpg",
    description: "One does not simply",
    link: "http://knowyourmeme.com/memes/one-does-not-simply-walk-into-mordor",
    defaultTextTop: "One does not simply",
    defaultTextBottom: "",
    slug: "one-does-not-simply"
  },
  {
    src: "images/memes/scumbag-steve.jpg",
    description: "Scumbag Steve",
    link: "http://knowyourmeme.com/memes/scumbag-steve",
    defaultTextTop: "",
    defaultTextBottom: "",
    slug: "scumbag-steve"
  },
  {
    src: "images/memes/y-u-no.jpg",
    description: "Y U NO",
    link: "http://knowyourmeme.com/memes/y-u-no",
    defaultTextTop: "",
    defaultTextBottom: "Y U NO",
    slug: "y-u-no"
  }
]);

memeCollection.forEach(function(m) {
  m.set("uniqueid", m.cid);
});

var memeListingView = Backbone.View.extend({
    model: memeCollection,
    events: {
        'click li': "startEditing",
        'click .list-nav': 'navigateList'
    },

    template: _.template('<% _.each(images, function(img) { %> <li data-cid="<%= img.uniqueid %>"><img src="<%= img.src %>" alt="<%= img.description %>" title="<%= img.description %>" /><span><a href="<%= img.link %>" target="_blank">(read)</a></span></li> <% }); %>'),

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

    selectMeme: function (slug, textTop, textBottom) {
        var model = memeCollection.findWhere({slug: slug});
        if (model) {
            this.loadMeme(model.toJSON(), textTop, textBottom);
        }
    },

    startEditing: function(e) {
      var cid = $(e.target).closest("[data-cid]").data("cid");
      var model = memeCollection.get(cid).toJSON();
      this.loadMeme(model);
    },

    loadMeme: function (meme, textTop, textBottom) {
        var img = new Image;
        console.log(meme, meme.slug);
        img.onload = function() {
            window.staticshowdown.Views.editorView.loadImage(img, (textTop || meme.defaultTextTop), (textBottom || meme.defaultTextBottom), meme.slug);
        }
        img.src = meme.src;
    },

    initialize: function (options) {
        this.render();
        var width = 0;
        // this.$ul = this.$("ul");
        // this.$scrollable = this.$(".list-wrap");
        // var li = this.$el.find("ul li").each(function() {
        //     width += $(this).outerWidth(true);
        // });

        // this.$ul.width(width);
    }
});