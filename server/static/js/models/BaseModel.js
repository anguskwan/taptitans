define(["jquery", "backbone"],
    function($, Backbone) {
        var wrapError = function(e, message) {
            var err = new Error(message);
            err.origError = e;
            return err;
        };

        var STATUS_SUCCESS = 0;

        // Creates a new Backbone Model class object
        return Backbone.Model.extend({
            getApp: function() {
                return Backbone.Wreqr.radio.channel('global');
            },
            triggerGlobalEvent: function( eventName, data ) {
                this.getApp().vent.trigger( eventName, data );
            },
            fetch: function(options) {

                var originOptions = options;
                options = options ? _.clone(options) : {};
                var beforeSend = options.beforeSend;
                if (options.parse === void 0) options.parse = true;
                var model = this;
                var success = options.success;
                options.success = function(resp) {
                    //not success
                    if (! ( !resp.statusCode || resp.statusCode === STATUS_SUCCESS ) ) {
                        alert(resp.errorMessage);
                        model.trigger('error', model, resp, options);
                    } else {
                        if (!model.set(model.parse(resp, options), options)) return false;
                        if (success) success(model, resp, options);
                        model.trigger('sync', model, resp, options);
                    }

                };
                options.error = function(error, errorType, errorText) {
                    console.log(errorType);
                    model.onFetchError(error, originOptions);
                };
                wrapError(this, options);


                return this.sync('read', this, options);
                
                
            },
            onFetchError: function(error, originOptions) {
                console.log(error);
            }
        });
    }
);