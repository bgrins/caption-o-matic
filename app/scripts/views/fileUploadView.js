var fileUploadView = Backbone.View.extend({

    events: {
    },

    onUpload: function (e, file) {
        console.log(" in the onupload", e.target.result);

        this.model.add({
            user: getUserID(),
            data: e.target.result
        });
    },

    initialize: function(options) {

        this.$el.fileReaderJS({
            dragClass: 'drag-over',
            readAsMap: {
                'image/*': 'DataURL',
                'text/*' : 'Text'
            },
            readAsDefault: 'DataURL',
            on: {
                load: _.bind(this.onUpload, this)
            }
        });
    }
});