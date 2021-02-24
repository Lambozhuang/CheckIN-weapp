//commonUtil.js
const app = getApp();
var compressInfo = function (userInfo, time) {
  if (app.globalData.isTeacher === 0) {
    return 'CheckIN_QRcode' + '//'
      + userInfo.name + '//'
      + userInfo.id + '//'
      + userInfo.school + '//'
      + time;
  } else {
    return 'Teacher'
  }

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

var compareInfo = function (_checkedList, _checkedNumber, _userInfo) {
  for (var i = 0; i < _checkedNumber; i++) {
    if (_checkedList[i].name === _userInfo.name
      && _checkedList[i].id === _userInfo.id
      && _checkedList[i].school === _userInfo.school) {
      return false;
    }
  }
  return true;
}

module.exports.compressInfo = compressInfo;
exports.decompressInfo = decompressInfo;
exports.compareInfo = compareInfo;