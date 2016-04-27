/**
 * Created by lhb on 15/10/21.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

var foo = function() {
    var channelService = app.get('channelService');
    channelService.broadcast("connector", 'broadcast', {type: "alert", msg: "服务器将在5分钟之后维护,请各位勇士稍息片刻。"});
    app.set("serverStatus", 2);
    return true;
};

result = foo();