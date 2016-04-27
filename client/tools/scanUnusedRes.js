var fs = require("fs");
var walk = require("walk");
var path = require("path");
global._ = require("underscore");

var walker = walk.walk("res_raw", {});

var imgs = [];
var ccbs = [];
var imgUsed = [];
var js = [];
var ccbUsed = [];

var imageFileHandler = function(root, fileStat, next){
	if(root.indexOf("animation") == -1) {
		imgs.push(fileStat.name);	
	}
	next();
};

var imageEndHandler = function(){
	scan();
};

var ccbFileHandler = function(root, fileStat, next) {
	if(path.extname(fileStat.name) == ".ccb"){
		ccbs.push(path.resolve(root, fileStat.name));
	}
	next();
}

var ccbEndHandler = function() {
	_.each(ccbs, function(ccb){
		var ccbStr = fs.readFileSync(ccb, "utf8");
		var pattern = /[a-zA-Z0-9_-]+\.png/g;
		var matches = ccbStr.match(pattern);
		imgUsed = imgUsed.concat(matches);
	});
	imgUsed = _.uniq(imgUsed);
	var unused = _.difference(imgs, imgUsed);
	console.log(unused);
	console.log(unused.length);
}

var jsFileHandler = function(root, fileStat, next) {
	js.push(path.resolve(root, fileStat.name));
	next();
}

var jsEndHandler = function() {
	_.each(js, function(jsFile){
		var jsStr = fs.readFileSync(jsFile, "utf8");
		var pattern = /[a-zA-Z0-9_-]+\.ccb/g;
		var matches = jsStr.match(pattern);
		ccbUsed = ccbUsed.concat(matches);
	});
	ccbUsed = _.uniq(ccbUsed);
	// console.log(ccbUsed);
	var ccbFileNames = _.map(ccbs, function(ccbFile){
		return path.basename(ccbFile);
	});
	var ccbUnused = _.difference(ccbFileNames, ccbUsed);
	// console.log(ccbUnused);
	// console.log(ccbUnused.length);
}

var scan = function() {
	walker = walk.walk("ccb", {});
	walker.on("file", ccbFileHandler);
	walker.on("end", ccbEndHandler);
	walker = walk.walk("src/js", {});
	walker.on("file", jsFileHandler);
	walker.on("end", jsEndHandler);
}

walker.on("file", imageFileHandler);

walker.on("end", imageEndHandler);

