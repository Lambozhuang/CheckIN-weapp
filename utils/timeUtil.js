//timeUtil.js
//
// Created by LamboTZ
// Copyright © 2021 LamboTZ. All rights reserved.
//
var formatNumber = function (n) {
  return ('' + n)[1] ? n : '0' + n;
};
var formatTime = function (t) {
  const year = t.getFullYear();
  return t.getFullYear() + '年'
          + formatNumber(t.getMonth() + 1) + '月'
          + formatNumber(t.getDate()) + '日 '
          + formatNumber(t.getHours()) + ':'
          + formatNumber(t.getMinutes()) + ':'
          + formatNumber(t.getSeconds());
  
};

module.exports = { formatTime };