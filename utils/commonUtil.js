//commonUtil.js
//
// Created by LamboTZ
// Copyright © 2021 LamboTZ. All rights reserved.
//
import base64 from 'base64.js'

const app = getApp();
var compressInfo = function (userInfo, time) {
  if (app.globalData.teacherFlag === 0) {
    const head = 'CheckIN_QRcode';
    return base64.encode(head) + '_'
      + base64.encode(userInfo.name) + '_'
      + base64.encode(userInfo.id) + '_'
      + base64.encode(userInfo.school) + '_'
      + base64.encode(time);
  } else {
    return 'NULL'
  }

};

var decompressInfo = function (_userInfo) {
  var strArray = _userInfo.split('_');
  
  if (base64.decode(strArray[0]) === 'CheckIN_QRcode') {
    return {
      name: base64.decode(strArray[1]),
      id: base64.decode(strArray[2]),
      school: base64.decode(strArray[3]),
      time: base64.decode(strArray[4])
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