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

        this.Collections.Images = new ImageCollection;

        this.Views.fileUploader = new fileUploadView({
            model: this.Collections.Images,
            el: $(".file-dropper")
        });
        this.Views.fileListing = new fileListingView({
            model: this.Collections.Images,
            el: $(".file-listing")
        });

        this.Views.memeListing = new memeListingView({
            el: $(".meme-listing")
        });
    }
};

$(document).ready(function () {
    'use strict';
    staticshowdown.init();
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