/**
 * Created by lhb on 15/10/16.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

var foo = function() {
    var channelService = app.get('channelService');
    channelService.broadcast("connector", 'shutdown', {type: "alert", msg: "服务器已开启维护模式。"});
    app.set("serverStatus", 2);
    return true;
};

result = foo();