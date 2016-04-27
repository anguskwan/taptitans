require.config({
    paths: {
        "underscore": "../bower_components/lodash/dist/lodash.underscore.min",
        "lodash": "../bower_components/lodash/dist/lodash.min",
        "template": "../bower_components/lodash-template-loader/loader",
        "jquery": "../bower_components/jquery/dist/jquery.min",
        "backbone": "../bower_components/backbone/backbone",
        "marionette": "../bower_components/marionette/lib/backbone.marionette.min",
        "mustache": "../bower_components/mustache/mustache.min",
        "text": "../bower_components/text/text",
        "iscroll":"../bower_components/iscroll/build/iscroll-lite",
        "waitforimages":"../bower_components/waitForImages/dist/jquery.waitforimages.min",
        "modernizr":"../bower_components/modernizr/modernizr",
        "async": "../bower_components/async/dist/async.min"
    },

    deps: ["main"],
    shim: {
        "jquery.hammerjs":{
            deps:["hammerjs"]
        },
    }
});
