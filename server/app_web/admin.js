module.exports = function(server) {
    server.get('/taptitans/admin/mails', function(req, res, next) {
        Db.mail.findAll(function(err, mails){
            if(err) return next(err);
            res.send({mails:mails});
            next();
        });
    });
    server.post('/taptitans/admin/create-or-update-mail', function(req, res, next) {
        if(!req.params.title || req.params.title == "") {
            return next(new InvalidParamError("标题不能为空"));
        }
        if(!req.params.message || req.params.message == "") {
            return next(new InvalidParamError("内容不能为空"));
        }
        if(!req.params.from || req.params.from == "") {
            return next(new InvalidParamError("发件人不能为空"));
        }
        if(!req.params.id) {
            //新建
            var mail = Db.mail.create();
            _.extend(mail, req.params);
            mail.save(function(err, mail){
                if(err) return next(err);
                res.send(mail);
                next();
            });

        }
        else {
            //更新
            Db.mail.findById(req.params.id, function(err, mail){
                if(err) return next(err);
                if(mail == null) return next(new RequestError("邮件未找到"));
                _.extend(mail, req.params);
                mail.save(function(err, mail){
                    if(err) return next(err);
                    res.send(mail);
                    next();
                });
            });
        }

    });
    server.post('/taptitans/admin/send-mail', function(req, res, next){
        async.waterfall([
                function(cb) {
                    Db.mail.findById(req.params.id, cb);
                },
                function(mail, cb) {
                    if(mail.length == 0) return cb(new RequestError("邮件未找到"));
                    if(req.params.isToAll) {
                        res.send({sent: false});
                        next();
                    }
                    else {
                        Db.Player._getModel("").update({id: {$in: req.params.to}}, {$push: {mailbox: {$each:[{id:req.params.id, read:0, getGoods:0}],$position:0, $slice:20}}}, {multi:true}, cb);    
                    }
                }
            ], function(err, affectedRows){
                if(err) return next(err);
                res.send({sent: affectedRows});
                next();
            }
        );

    });

    server.get('/taptitans/admin/query-user-by-name', function(req, res, next) {
        Db.Player._getModel("").find({name: {$regex: req.params.name}}, "id uniqueId name avatar stage highestStage gold diamond", function(err, p){
            if(err) return next(err);
            if(p == null) return next(new RequestError("用户未找到"));
            res.send(p);
            next();
        });
    });

    server.get('/taptitans/admin/unlock', function(req, res, next) {
        Db.Player._getModel("").update({id: req.params.id}, {$set:{ isBanned: false, cheatLevel: 0 }}, {multi:false}, function(err) {
            if (err) {
                return next(err);
            }

            res.send({sent: "OK"})
            next();
        });
    })
}