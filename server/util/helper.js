exports.encryptCookie = function(playerId) {
    var cipher = require('crypto').createCipher('DES-ECB', 'AABBCCDD');
    var res = cipher.update(playerId + "", "utf8", "hex");
    res += cipher.final("hex");
    return res;
};

exports.decryptCookie = function(cookie) {
    var decipher = require('crypto').createDecipher('DES-ECB', 'AABBCCDD');
    var res = decipher.update(cookie, "hex", "utf8");
    res += decipher.final("utf8");
    return res;
}

exports.generateRandomKey = function(len) {
	return require('crypto').randomBytes(len).toString('hex');
};