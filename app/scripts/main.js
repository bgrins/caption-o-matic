/*global staticshowdown, $*/


window.staticshowdown = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    ImageRepo: {},
    UserRepo: {},
    init: function () {
        'use strict';

        // this.Collections.Images = new ImageCollection;
        // this.Views.fileUploader = new fileUploadView({
        //     model: this.Collections.Images,
        //     el: $(".file-dropper")
        // });
        // this.Views.fileListing = new fileListingView({
        //     model: this.Collections.Images,
        //     el: $(".file-listing")
        // });

        this.Views.memeListing = new memeListingView({
            el: $(".memes-wrapper")
        });
        this.Views.editorView = new editorView({
            el: $("#preview-wrap")
        });
    }
};

$(document).ready(function () {
    'use strict';
    staticshowdown.init();
    $(".meme-listing img:first").click();
    staticshowdown.Views.editorView.updateLineByNumber(1);
    staticshowdown.Views.editorView.updateLineByNumber(2);
});

$(function () {
    $("#post-to-imgur").click(function() {
        window.staticshowdown.Views.editorView.kineticView.stage.toDataURL({
            callback: function(dataurl) {
                dataurl = dataurl.replace(/.*,/, '');
    console.log(dataurl);

                var clientId = "de853a3d6821e1c";
                var authorization = 'Client-ID ' + clientId;

                $.ajax({
                  url: 'https://api.imgur.com/3/image',
                  method: 'POST',
                  headers: {
                    Authorization: authorization,
                    Accept: 'application/json'
                  },
                  data: {
                    image: dataurl,
                    type: 'base64'
                  },
                  success: function(result) {
                    var id = result.data.id;
                    window.location = 'https://imgur.com/gallery/' + id;
                  }
                });
            }
        });
        

        return false;
    });
});


function generateRandomString (len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if(!len) len = 5;
    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function getUserID () {
    var id = localStorage.getItem('userID');
    if(!id) {
        id = this.generateRandomString();
        localStorage.setItem('userID', id);
    }
    return id;
}