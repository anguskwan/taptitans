/**
 * Created by lhb on 15/11/6.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

module.exports = {

    _id : "Number",
    name: "String",
    icon : "String",
    members : ["Number"],
    creator : "Number",
    president : "Number",
    presidentName : "String",
    createTime: "Date",
    level : {
        type :"Number",
        default: 1
    },
    exp : {
        type : "Number",
        default:0
    },
    joinReq : [],
    battleMsg:[],
    win: {
        type: "Number",
        default:0
    },
    lose: {
        type: "Number",
        default:0
    },
    battlePoint: {
        type : "Number",
        default: 0
    },
    notice: {
        type: "String",
        default:"请在这里留下公会宣言"
    },
    newbie: [],
    war : {
        type: "Number",
        default: 0
    },
    setting: {},
    contribution : {},
    redEnvelope:[],
    upgrades:{}
};