/**
 * Created by lhb on 15/11/11.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

var foo = function() {
    var channelService = app.get('channelService');
    var show = true;
    channelService.broadcast("connector", 'showPKButton', {type: "data", isShow: show});
    app.set("showPKButton", show);
    return true;
};

result = foo();
