define(["underscore", "jquery", "models/BaseModel"],
    function(_, $, BaseModel, ajax) {
        return BaseModel.extend({
            initialize: function(options) {

            },
            url: function() {
                return "/taptitans/admin/mails";
            },
            parse: function(ret) {
                if(ret.errcode != 0) {
                    alert(ret.errmsg);
                    return;
                }
                for (var i = 0; i < ret.data.mails.length; i++) {
                    var mail = ret.data.mails[i];
                    for (var j = mail.attachments.length; j < 3; j++) {
                        mail.attachments.push({type: "", num: 0});
                    }
                    mail.attachments = this.attachmentsToOptions(mail.attachments);
                };
                return ret.data;
            },
            attachmentsToOptions: function(attachments) {
                var items = {
                    "":"无",
                    "diamond" :"钻石",
                    "crystal" : "水晶",
                    "weaponItem" : "武器",
                    "fragment" : "碎片",
                    "relic" : "圣物",
                    "goldRain" : "天降黄金",
                    "autoTap" : "自动点击",
                    "doom" : "死亡末日",
                    "refreshSkill" : "技能刷新",
                    "powerOfHolding" : "坚持神力",
                    "gold" : "金币",
                    "tenTimes" : "十连抽"
                };
                return _.map(attachments, function(attach){
                    var options = [];
                    _.each(items, function(v, k){
                        options.push({
                            val: k,
                            name: v,
                            sel: attach.type == k
                        });
                    });
                    attach.options = options;
                    return attach;
                });
            },
            createOrUpdateMail: function(mail) {
                var self = this;
                $.ajax({
                    url: '/taptitans/admin/create-or-update-mail',
                    type: 'POST',
                    data: JSON.stringify(mail),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function(data) {
                        if(data.errcode != 0) {
                            alert(data.errmsg);
                            return;
                        }
                        console.log(data);
                        self.trigger("mailSaved");
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        alert(xhr.responseJSON.errmsg);
                    }
                });
            },
            sendMail: function(mail) {
                var self = this;
                $.ajax({
                    url: '/taptitans/admin/send-mail',
                    type: 'POST',
                    data: JSON.stringify(mail),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function(res) {
                        if(res.errcode != 0) {
                            alert(res.errmsg);
                            return;
                        }
                        self.trigger("mailSent");
                        alert("成功发送:" + res.data.sent);
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        alert(xhr.responseJSON.errmsg);
                    }
                });
            }
        });
    }
);