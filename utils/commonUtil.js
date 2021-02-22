//commonUtil.js

var compressInfo = function (userInfo, time) {
  return userInfo.name + '//'
         + userInfo.id + '//'
         + userInfo.school + '//'
         + time;
};

var decompressInfo = function (_userInfo) {
  var str = _userInfo.split('//');
  return {
    name: str[0],
    id: str[1],
    school: str[2],
    time: str[3]
  }
}

module.exports.compressInfo = compressInfo;
exports.decompressInfo = decompressInfo;