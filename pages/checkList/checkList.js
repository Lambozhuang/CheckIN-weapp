// pages/checkList/checkList.js
import commonUtil from '../../utils/commonUtil'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedList: [

    ],

    checkedNumber: 0,

    scanContinue: false,
    scanFail: false,

    tempUserInfo: {

    },

    compareFlag: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const _this = this;
    if (_this.data.scanContinue === true && _this.data.scanFail === false) {
      //显示扫码信息并提示是否继续扫码
      if (_this.data.compareFlag) {
        wx.showModal({
          title: '扫码成功',
          content: _this.data.tempUserInfo.name + ' 已签到',
          confirmText: '继续扫码',
          cancelText: '返回列表',
          success(res) {
            if (res.confirm) {
              _this.scanCode();
            } else if (res.cancel) {
              _this.setData({
                scanContinue: false,
              });
            }
          }
        });
      } else {
        wx.showModal({
          title: '无法重复签到',
          content: _this.data.tempUserInfo.name + ' 已签到',
          confirmText: '继续扫码',
          cancelText: '返回列表',
          success(res) {
            if (res.confirm) {
              _this.scanCode();
            } else if (res.cancel) {
              _this.setData({
                scanContinue: false,
              });
            }
          }
        });
      }
      
    } else if (_this.data.scanFail === true) {
      _this.setData({
        scanFail: false
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  scanCode: function () {
    const _this = this;
    _this.setData({
      scanFail: false,
    });
    wx.scanCode({
      success(res) {
        const _tempUserInfo = commonUtil.decompressInfo(res.result);
        const _compareFlag = commonUtil.compareInfo(_this.data.checkedList, _this.data.checkedNumber, _tempUserInfo);
        if (_tempUserInfo != 'FAIL' && _tempUserInfo.name != 'NULL' && _compareFlag) {
          const _checkedList = [..._this.data.checkedList, _tempUserInfo];
          const _checkedNumber = _this.data.checkedNumber + 1;
          _this.setData({
            checkedList: _checkedList,
            checkedNumber: _checkedNumber,
            tempUserInfo: _tempUserInfo,
            scanContinue: true,
          });
        } else if (_compareFlag === false) {
          _this.setData({
            compareFlag: _compareFlag,
          });
        } else {
          wx.showToast({
            title: '无效的签到码',
            icon: 'error',
            duration: 2000
          });
          _this.setData({
            scanFail: true,
          });

        }

      },

      fail() {
        _this.setData({
          scanContinue: false,
        });
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
        title: '警告',
        content: '此操作不可撤回',
        confirmText: '确认删除',
        confirmColor: '#ff3838',
        success(res) {
          if (res.confirm) {
            _this.setData({
              checkedList: [],
              checkedNumber: 0,
            });
          }

        }
      });
    }

  },

  //导出列表
  outputList: function () {
    if (this.data.checkedNumber === 0) {
      wx.showToast({
        title: '列表为空',
        icon: 'error',
      });
    }
  }



})