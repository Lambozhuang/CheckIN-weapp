// pages/checkList/checkList.js
//
// Created by LamboTZ
// Copyright © 2021 LamboTZ. All rights reserved.
//
import commonUtil from '../../utils/commonUtil'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedList: [],
    checkedNumber: 0,
    theme: "light",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    wx.getSystemInfo({
      success(res) {
        _this.setData({
          theme: res.theme,
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const _this = this;
    _this.setData({
      checkedList: app.globalData.checkedList,
      checkedNumber: app.globalData.checkedNumber,
    });
    wx.onThemeChange((res) => {
      _this.setData({
        theme: res.theme,
      });
    });
  },

  scanCode: function () {
    const _this = this;
    wx.scanCode({
      success(res) {
        const _tempUserInfo = commonUtil.decompressInfo(res.result);
        console.log("_tempUserInfo: " + _tempUserInfo);
        if (_tempUserInfo != 'FAIL') { //签到码有效
          const _compareFlag = commonUtil.compareInfo(_this.data.checkedList, _this.data.checkedNumber, _tempUserInfo);
          if (_compareFlag === true) { //签到不重复
            const _checkedList = [..._this.data.checkedList, _tempUserInfo];
            const _checkedNumber = _this.data.checkedNumber + 1;
            _this.setData({
              checkedList: _checkedList,
              checkedNumber: _checkedNumber,
            });
            app.globalData.checkedList = _checkedList;
            wx.setStorage({
              key: 'checkedList',
              data: _checkedList,
              success() {
                console.log('签到列表缓存成功');
              }
            });
            app.globalData.checkedNumber = _checkedNumber;
            wx.setStorage({
              key: 'checkedNumber',
              data: _checkedNumber,
            });
            _this.afterScanCode(_tempUserInfo, _compareFlag);
          } else { //签到重复
            _this.afterScanCode(_tempUserInfo, _compareFlag);
          }
        } else { //签到码无效
          wx.showToast({
            title: '无效的签到码',
            icon: 'error',
            duration: 2000
          });
        }

      },
    });


  },

  //判断是否继续扫码
  afterScanCode: function (_tempUserInfo, _compareFlag) {
    const _this = this;
    if (_compareFlag) {
      wx.showModal({
        title: '扫码成功',
        content: _tempUserInfo.name + ' 已签到',
        confirmText: '继续扫码',
        cancelText: '返回列表',
        success(res) {
          if (res.confirm) {
            _this.scanCode();
          }
        }
      });
    } else {
      wx.showModal({
        title: '无法重复签到',
        content: _tempUserInfo.name + ' 已签到',
        confirmText: '继续扫码',
        cancelText: '返回列表',
        success(res) {
          if (res.confirm) {
            _this.scanCode();
          }
        }
      });
    }

  },

  //单个列表项目被点击
  checkListTap: function (e) {
    const _this = this;
    wx.vibrateShort({
      type: 'heavy'
    });
    wx.showModal({
      title: '是否删除该记录？',
      success(res) {
        if (res.confirm) {
          Array.prototype.remove = function (index) {
            if (index > -1) {
              this.splice(index, 1);
            }
          }

          const _id = e.currentTarget.id;
          const _checkedList = _this.data.checkedList;
          const _checkedNumber = _this.data.checkedNumber - 1;
          _checkedList.remove(_id);
          _this.setData({
            checkedNumber: _checkedNumber,
            checkedList: _checkedList,
          });
          app.globalData.checkedList = _checkedList;
          wx.setStorage({
            key: 'checkedList',
            data: _checkedList,
          });
          app.globalData.checkedNumber = _checkedNumber;
          wx.setStorage({
            key: 'checkedNumber',
            data: _checkedNumber,
          });

        }
      }
    });
  },

  //清空当前列表
  deleteList: function () {
    if (this.data.checkedNumber === 0) {
      wx.showToast({
        title: '列表为空',
        icon: 'error',
      });
    } else {
      const _this = this;
      wx.showModal({
        title: '警告: 清空列表',
        content: '此操作不可撤回',
        confirmText: '确认删除',
        confirmColor: '#ff3838',
        success(res) {
          if (res.confirm) {
            _this.setData({
              checkedList: [],
              checkedNumber: 0,
            });
            app.globalData.checkedList = [];
            wx.setStorage({
              key: 'checkedList',
              data: [],
            })
            app.globalData.checkedNumber = 0;
            wx.setStorage({
              key: 'checkedNumber',
              data: 0,
            });
          }

        }
      });
    }

  },

})