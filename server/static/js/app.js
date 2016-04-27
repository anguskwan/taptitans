define(function (require, exports, module) {
    "use strict";
    // External dependencies.
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var IScroll = require("iscroll");
    
    // The root path to run the application through.
    exports.root = '/';

    window.app = new Backbone.Marionette.Application();

    app.addInitializer(function (options) {
        var MainView = require('views/MainView');
        app.mainView = new MainView();
        app.reqres.setHandler('mainView', function(){
          return app.mainView;
        });
        app.mainRegion.show(app.mainView);

        Backbone.history.start({ pushState: false, root: "/" });
    });

    app.addRegions({
        mainRegion: '#mainWrapper'
    });

    return app;

});
