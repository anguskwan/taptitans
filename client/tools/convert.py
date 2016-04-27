#!/usr/bin/python
# -*- coding: utf-8 -*- 
import xlrd
import json
import codecs
import sys
import os
import shutil
import re
import time

relpath = os.path.dirname(os.path.realpath(__file__))
SRC = relpath + "/../res_raw/config/"
OUT = relpath + "/../resource/config/"

PARSE_TYPE_BOOL = u"布尔"
PARSE_TYPE_INT = u"整数"
PARSE_TYPE_FLOAT = u"小数"
PARSE_TYPE_STR = u"文本"
PARSE_TYPE_INT_ARRAY = u"整数数组"
PARSE_TYPE_FLOAT_ARRAY = u"小数数组"
PARSE_TYPE_STR_ARRAY = u"文本数组"
PARSE_TYPE_JSON = u"JSON"

def normalize(original):
    return original.replace(u"，",u",");

def fixjson(origin):
    origin = origin.strip()
    print origin
    if origin.startswith('['):
        pass
    elif not origin.startswith('{'):
        origin = "{" + origin + "}"
    regexp = re.compile(r"([0-9A-Za-z_-]+)(?=:)")
    subed = regexp.sub('"\\1"', origin)
    regexp = re.compile(r'(?<=[,\[])([\.0-9A-Za-z_-]+)(?=[,\]])')
    subed = regexp.sub('"\\1"', subed)
    print subed
    return subed

def unicode2str(input):
    if isinstance(input, dict):
        return {unicode2str(key): unicode2str(value) for key, value in input.iteritems()}
    elif isinstance(input, list):
        return [unicode2str(element) for element in input]
    elif isinstance(input, unicode):
        return input.encode('utf-8')
    else:
        return input

def parseXls(filename, sheet, indexKey, results):
    book = xlrd.open_workbook(filename)
    sh = book.sheet_by_index(sheet)
    print os.path.basename(filename), sh.name.encode('utf-8'), sh.nrows, sh.ncols

    for rx in range(3, sh.nrows):
        valType = sh.cell_type(rowx=rx, colx=0)
        if (valType == xlrd.XL_CELL_EMPTY):
            continue
        item = dict()
        for cx in range(0, sh.ncols):
            key = sh.cell_value(rowx=1, colx=cx).encode('utf-8')
            type = unicode(sh.cell_value(rowx=2, colx=cx))
            parseCell(item, sh, key, rx, cx, type)
        results[item[indexKey]]=item;

def parseCell(target, sh, key, row, col, type):
    val = sh.cell_value(rowx=row, colx=col)
    valType = sh.cell_type(rowx=row, colx=col)
    #print "Parse row:%d, key:%s, col:%d, type:%d" % (row, key, col, valType)
    if valType == xlrd.XL_CELL_TEXT:
        val = val
    if not valType in (xlrd.XL_CELL_TEXT, xlrd.XL_CELL_EMPTY):
        if type == PARSE_TYPE_FLOAT or type == PARSE_TYPE_FLOAT_ARRAY:
            val = str(float(val))
        else:
            val = str(int(val))

    if type == PARSE_TYPE_BOOL:
        if str(val) == "FALSE" or str(val) == "false" or str(val) == "0":
            target[key] = False
        else:
            target[key] = True
    elif type == PARSE_TYPE_INT:
        if val == "":
            target[key] = 0
        else :
            target[key] = int(val)
    elif type == PARSE_TYPE_FLOAT:
        if val == "":
            target[key] = 0.0
        else :
            target[key] = float(val)
    elif type == PARSE_TYPE_STR:
        target[key] = val.encode("utf-8")
    elif type == PARSE_TYPE_INT_ARRAY:
        if val == "" or val == -1 or val == 0:
            target[key] = []
        else:
            val = normalize(val)
            target[key] = [int(x) for x in re.split(",|\|", val)]
    elif type == PARSE_TYPE_FLOAT_ARRAY:
        if val == "" or val == -1 or val == 0:
            target[key] = []
        else:
            val = normalize(val)
            target[key] = [float(x) for x in re.split(",|\|", val)]
    elif type == PARSE_TYPE_STR_ARRAY:
        if val == "":
            target[key] = []
        else:
            target[key] = [x.encode("utf-8") for x in re.split(",|\|", val)]
    elif type == PARSE_TYPE_JSON:
        if val == "":
            #target[key] = None
            pass
        else:
            # 处理json里key没有引号的情况，并把load出得json从unicode转成str
            target[key] = unicode2str(json.loads(fixjson(val.encode('utf-8'))))

def convert(xlsx, sheetIdx, jsonName, key):
    data = dict()
    parseXls(SRC + xlsx, sheetIdx, key, data)
    codecs.open(OUT + jsonName + ".json", "w", "utf-8").write(json.dumps(data, indent=2, ensure_ascii=False, sort_keys=True).decode("utf-8"))

def convertConfig(xlsx, sheetIdx, jsonName):
    data = dict()
    book = xlrd.open_workbook(SRC + xlsx)
    sh = book.sheet_by_index(sheetIdx)
    print os.path.basename(xlsx), sh.name.encode('utf-8'), sh.nrows, sh.ncols
    for rx in range(1, sh.nrows):
        valType = sh.cell_type(rowx=rx, colx=1)
        if (valType == xlrd.XL_CELL_EMPTY):
            continue
        key = sh.cell_value(rowx=rx, colx=0).encode('utf-8')
        type = unicode(sh.cell_value(rowx=rx, colx=1))
        parseCell(data, sh, key, rx, 2, type)
    codecs.open(OUT + jsonName + ".json", "w", "utf-8").write(json.dumps(data, indent=2, ensure_ascii=False, sort_keys=True).decode("utf-8"))

convertConfig("config.xlsx", 0, "config");

convert("hero.xlsx", 0, "hero", "id");
convert("hero.xlsx", 1, "heroSkill", "id");
convert("hero.xlsx", 2, "heroSkillDesc", "id");
convert("masterSkill.xlsx", 0, "masterSkill", "id");
convert("artifacts.xlsx", 0, "artifactsCost", "id");
convert("artifacts.xlsx", 1, "artifacts", "id");
convert("shop.xlsx", 0, "shop", "id");
convert("payment.xlsx", 0, "payment", "id");
convert("achievements.xlsx", 0, "achievements", "id");
convert("bossName.xlsx", 0, "bossName", "id");
convert("contest.xlsx", 0, "contest", "id");
convert("contestHard.xlsx",0,"contestHard", "id");
convert("vip.xlsx",0,"vip", "id");
convert("guildLevel.xlsx",0,"guildLevel", "id");
convert("activity.xlsx",0,"activityCat", "id");
convert("activity.xlsx",1,"activityPurchase", "id");
convert("activity.xlsx",2,"activityDiamond", "id");
convert("activity.xlsx",3,"activityGrowthFund", "id");
convert("equipSkill.xlsx",0,"equipSkill", "id");
convert("equip.xlsx",0,"equipMeta", "id");
convert("everyDayReward.xlsx",0,"everyDayReward", "id");
convert("redEnvelope.xlsx",0,"redEnvelope", "id");
convert("market.xlsx",0,"market", "id");
convert("guildGoldScore.xlsx",0,"guildGoldScore", "id");
convert("dailyTask.xlsx",0,"dailyTask", "id");
convert("shareReward.xlsx",0,"shareReward", "id");
convert("treasureChest.xlsx",0,"treasureChest", "id");
convert("petType.xlsx",0,"petType", "id");
convert("petRank.xlsx",0,"petRank", "id");
convert("petChallengeReward.xlsx",0,"petChallengeReward", "id");
convert("petRankReward.xlsx",0,"petRankReward", "id");

