/**
 * Created by lhb on 15/12/25.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */
var formula = require('../consts/formula');
var exp = module.exports;

var getEquipSkills = function(equips) {
    var ret = [];
    for(var i = 0; i < 34; i++) {
        ret.push(0);
    }
    var skillMeta = Conf.equipSkill;
    var equipMeta = Conf.equipMeta;
    _.each(equips, function(v, k) {
        var s = v.skill;
        var sm = skillMeta[s];
        var em = equipMeta[k];
        var lv = em.rare + v.step - 1;
        var val = sm['lv'+lv];
        var rate = sm.rate;
        if (Util.randomRate(rate)) {
            skillEffect(ret, s, val, v.target);
        }
    });
    return ret;
};

var addValToArray = function(arr, val, targets) {
    _.each(targets, function(v) {
        arr[v] = Math.min(1,val+arr[v]);
    });
};
var skillEffect = function(effcts, sid, val, tar) {
    var meta = Conf.equipSkill[sid];
    var total = _.range(1, 34);
    var targets;

    switch(parseInt(sid)) {
        case 1:
            targets = total;
            break;
        case 2:
        case 3:
        case 4:
            targets = meta.target;
            break;
        case 5:
            targets = _.sample(total, 5);
            break;
        case 6:
        case 7:
        case 8:
            targets = _.sample(meta.target, 5);
            break;
        case 9:
            targets = [tar];
            break;
    }
    addValToArray(effcts, val, targets);
};

exp.pk = function(attacker, defender) {

    var result = {
        detail : [],
        alive:""
    };
    var atkEff = getEquipSkills(attacker.equips);
    var defEff = getEquipSkills(defender.equips);
    for (var i = 1; i <= _.size(Conf.hero); i ++) {
        var p1dps = formula.heroFightValue(attacker, i) * (1- defEff[i]);
        var p2dps = formula.heroFightValue(defender, i, true) * (1- atkEff[i]);
        result.detail.push({
            id: i,
            p1:{dps:p1dps, nerf:defEff[i]},
            p2:{dps:p2dps, nerf:atkEff[i]}
        });
        if (p1dps <= p2dps) {
            result.alive += "1";
        } else {
            result.alive += "0";
        }
    }
    return result;
};
