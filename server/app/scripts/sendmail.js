/**
 * Created by lhb on 15/11/19.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

var db = app.dbModule;

var foo = function() {
    db.Player.update({}, {$push: {mailbox: {$each:[{id:5, read:0, getGoods:0}],$position:0, $slice:20}}},{multi:true}, function() {});
    return true;
};

result = foo();
