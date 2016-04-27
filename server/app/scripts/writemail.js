
var db = app.dbModule;

var foo = function() {
    db.inc("mail", function(err, id) {
        var mail = db.mail.create(parseInt(id));
        mail._id = id;
        mail.id = id;
        mail.title = "服务器更新补偿";
        mail.message = "- 增加公会功能\n- pk80关开启\n- 添加神圣酒杯视觉效果\n- 增加连点两下出现批量升级按钮\n- 界面常驻图标收缩入口\n\n服务器维护给大家造成了不便，补偿100钻石。";
        mail.from = "打怪兽管理员";
        mail.attachments = [{type:'diamond',num:100}];
        mail.save();
    });
    return true;
};

result = foo();
