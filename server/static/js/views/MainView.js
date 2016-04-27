define(['app', 'backbone', 'marionette', 'mustache', 'jquery', 'text!templates/main.html', 'text!templates/loading.html'],
    function(App, Backbone, Marionette, Mustache, $, template, loadingOverlayTemplate) {
        return Backbone.Marionette.LayoutView.extend({
            template: function(serialized_model) {
                return Mustache.render(template, serialized_model);
            },
            id: 'main',
            initialize: function() {
                var self = this;
                var globalVent = Backbone.Wreqr.radio.channel('global').vent;

                globalVent.on('startLoading', function() {
                    self.startLoading();
                });

                globalVent.on('stopLoading', function() {
                    self.stopLoading();
                });

                globalVent.on('resetLoading', function() {
                    self.resetLoading();
                });

            },
            events: {
            },
            ui: {
                'primary': '#primary'
            },
            regions: {
                primaryRegion: '#primary'
            },
            templateHelpers: {
            },
            onShow: function() {

            },
            updatePrimaryRegion: function(view) {
                this.primaryRegion.show(view);
            },
            navigateBack: function(ev) {
                window.history.back();

            },
            startLoading: function(msg) {
                this.loadingCount++;
                if (this.loadingCount === 1) {
                    this.loadingOverlay = $(loadingOverlayTemplate);
                    this.$el.append(this.loadingOverlay);
                }
            },
            stopLoading: function() {
                if (this.loadingCount > 0) {
                    this.loadingCount--;
                    if (this.loadingCount < 1 && this.loadingOverlay) {
                        this.loadingOverlay.remove();
                    }
                }
            },
            resetLoading: function() {
                this.loadingCount = 0;
                if (this.loadingOverlay) {
                    this.loadingOverlay.remove();
                }

            },
            loadingCount: 0
        });
    });