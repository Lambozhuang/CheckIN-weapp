//commonUtil.js

var getCurrentInfo = function (userInfo, time) {
  return userInfo.name + '//'
         + userInfo.id + '//'
         + userInfo.school + '//'
         + time;
};

module.exports = { getCurrentInfo };