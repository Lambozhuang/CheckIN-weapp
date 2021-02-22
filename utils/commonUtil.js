//commonUtil.js

var compressInfo = function (userInfo, time) {
  return 'CheckIN_QRcode' + '//'
         + userInfo.name + '//'
         + userInfo.id + '//'
         + userInfo.school + '//'
         + time;
};

var decompressInfo = function (_userInfo) {
  var str = _userInfo.split('//');
  if (str[0] === 'CheckIN_QRcode') {
    return {
      name: str[1],
      id: str[2],
      school: str[3],
      time: str[4]
    }
  } else {
    return 'FAIL'
  }
  
}

module.exports.compressInfo = compressInfo;
exports.decompressInfo = decompressInfo;