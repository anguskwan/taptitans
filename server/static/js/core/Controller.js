define(['app', 'backbone', 'underscore', 'marionette','views/MailView'],
    function (App, Backbone, _, Marionette, MailView) {
        return Backbone.Marionette.Controller.extend({
            initialize: function (options) {
                this.globalChannel = Backbone.Wreqr.radio.channel('global');
            },
            index: function() {
                var mailView = new MailView();
                app.mainView.updatePrimaryRegion(mailView);
            }
        });
    });