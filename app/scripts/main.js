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
vex.defaultOptions.className = 'vex-theme-flat-attack';

$(document).ready(function () {
    'use strict';
    staticshowdown.init();

    function populateFromHash () {
        var params = window.location.hash.substring(1).split('|');
        if (params.length === 3) {
            staticshowdown.Views.memeListing.selectMeme(params[0], params[1], params[2]);
        }
    };

    $(window).on('hashchange', populateFromHash);

    if (!window.location.hash) {
        var firstImg = $(".meme-listing img")[0];
        if (firstImg.complete) {
            firstImg.click();
        }
        else {
            firstImg.onload = function() {
                firstImg.click();
            }
        }
        staticshowdown.Views.editorView.updateLineByNumber(1);
        staticshowdown.Views.editorView.updateLineByNumber(2);
    }
    else {
        populateFromHash();
    }
});

$(function () {
    var loader = $("#loader-template").html();
    $("#post-to-imgur").click(function() {

        function uploadToImgur (dataurl) {
            dataurl = dataurl.replace(/.*,/, '');
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
              success: showImgurUrl
          });
        }

        function showImgurUrl (result) {
            var url = "https://imgur.com/gallery/" + result.data.id;
            vex.close();
            vex.open({
                content: 'Your image is now on imgur!<br /><a target="_blank" href="' + url + '">' + url + '</a>'
            });
        }

        vex.open({
            content: "We're uploading your image to imgur. <br /><div style='width:25px; margin: 0 auto;'>" + loader +"</div>",
            overlayClosesOnClick: false
        });
        window.staticshowdown.Views.editorView.kineticView.stage.toDataURL({
            callback: uploadToImgur
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