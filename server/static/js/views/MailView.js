define(['app', 'backbone', 'marionette', 'mustache', 'jquery', 'text!templates/mail.html', 'models/Mail'],
    function(App, Backbone, Marionette, Mustache, $, template, Mail) {
        return Backbone.Marionette.LayoutView.extend({
            template: function(serialized_model) {
                return Mustache.render(template, serialized_model);
            },
            id: 'mail',
            modelEvents: {
                "sync": "onModelSync",
                "mailSaved": "onMailSaved",
                "mailSent": "onMailSent"
            },
            initialize: function() {
                this.model = new Mail();
                this.model.fetch();
            },
            events: {
                "click #newMail": "newMail",
                "click .selectMailToEdit": "selectMail",
                "click #saveMail": "saveMail",
                "click .selectMailToSend": "selectMailToSend",
                "click #sendMail": "sendMail"
            },
            ui: {
                "mailTitle": "#editMailForm #mailTitle",
                "mailMessage": "#editMailForm #mailMessage",
                "mailFrom": "#editMailForm #mailFrom"

            },
            templateHelpers: {
            },
            onShow: function() {

            },
            onModelSync: function() {
                this.render();
            },
            newMail: function() {
                var newMail = {
                    id: null,
                    title: "test",
                    message: "test",
                    attachments: [{type:"", num:0}, {type:"", num:0}, {type:"", num:0}],
                    from: "打怪兽管理员",
                    isToAll: false,
                    to: ""
                };
                newMail.attachments = this.model.attachmentsToOptions(newMail.attachments)
                this.model.set("selectedMail", newMail);
                this.render();
            },
            selectMail: function(ev) {
                var item = $(ev.currentTarget);
                var mailId = parseInt(item.attr("data-mailId"));
                this.model.set("sendMail", null);
                this.model.set("selectedMail", _.find(this.model.get("mails"), function(mail){
                    return mail.id == mailId;
                }));
                this.render();
            },
            saveMail: function() {
                var selectedMail = this.model.get("selectedMail");
                selectedMail.title = this.ui.mailTitle.val();
                selectedMail.message = this.ui.mailMessage.val();
                selectedMail.from = this.ui.mailFrom.val();
                var attachments = [];
                var selects = $(".emailAttachmentsType");
                var nums = $(".emailAttachmentsNum");
                _.each(selects, function(select, idx){
                    var type = $(select.options[select.selectedIndex]).val();
                    if(type == "") {
                        return;
                    }
                    attachments.push({type: type, num: parseInt($(nums[idx]).val())});
                });
                selectedMail.attachments = attachments;
                this.model.createOrUpdateMail(selectedMail);
            },
            onMailSaved: function() {
                this.model.set("selectedMail", null);
                this.model.set("sendMail", null);
                this.model.fetch();
            },
            selectMailToSend: function(ev) {
                var item = $(ev.currentTarget);
                var mailId = parseInt(item.attr("data-mailId"));
                this.model.set("selectedMail", null);
                this.model.set("sendMail", _.find(this.model.get("mails"), function(mail){
                    return mail.id == mailId;
                }));
                this.render();
            },
            sendMail: function() {
                var mail = _.pick(this.model.get("sendMail"), "id", "title");
                mail.isToAll = $('input[name=sendType]:checked', '#sendMailForm').val() === "all";
                mail.to = $("#mailTo").val().split(",");
                this.model.triggerGlobalEvent("startLoading");
                this.model.sendMail(mail);
            },
            onMailSent: function() {
                this.model.triggerGlobalEvent("stopLoading");
            }
        });
    });