// pages/index/index.js
const app = getApp();
import drawQrcode from '../../utils/weapp.qrcode.js'
import timeUtil from '../../utils/timeUtil.js'
import commonUtil from '../../utils/commonUtil.js'

const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;
const qrcode_w = 450 / rate;

const test = 'pyq//202020202020//zju//2021-2-19'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime: '',
    qrcode_w: qrcode_w,
    userInfo: {
      name: '',
      id: '',
      school: '',
      time: '',
    },
    loginFlag: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const _this = this;
    wx.getStorage({
      key: 'loginFlag',
      success(res) {
        app.globalData.loginFlag = res.data;
        console.log('用户本地登录状态读取成功');
        if (app.globalData.loginFlag === 1) {
          wx.getStorage({
            key: 'userData',
            success(res) {
              app.globalData.userInfo = res.data;
              console.log('用户缓存数据读取成功');
            }
          });
          _this.setData({
            userInfo: {
              name: app.globalData.userInfo.name,
              id: app.globalData.userInfo.id,
              school: app.globalData.userInfo.school,
            },
            loginFlag: app.globalData.loginFlag,
          });
        }
      }
    });

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

    //显示当前时间
    var _this = this;
    var interval = setInterval(function () {
      _this.setData({
        currentTime: timeUtil.formatTime(new Date())
      });
    }, 1000);

    //显示二维码
    drawQrcode({
      width: qrcode_w,
      height: qrcode_w,
      canvasId: 'myQrcode',
      text: commonUtil.compressInfo(app.globalData.userInfo, this.data.currentTime),
      foreground: '#00a2ff'
    });

    var interval2 = setInterval(function () {
      var _currentTime = timeUtil.formatTime(new Date());
      drawQrcode({
        width: qrcode_w,
        height: qrcode_w,
        canvasId: 'myQrcode',
        text: commonUtil.compressInfo(app.globalData.userInfo, _currentTime),
        foreground: '#00a2ff'
      });
    }, 60000);

    this.setData({
      userInfo: {
        name: app.globalData.userInfo.name,
        id: app.globalData.userInfo.id,
        school: app.globalData.userInfo.school,
      },
      loginFlag: app.globalData.loginFlag,
    })

    if (app.globalData.isTeacher === 1) {
      wx.switchTab({
        url: '../checkList/checkList'
      });
    } else if (app.globalData.loginFlag === 0) {
      wx.navigateTo({
        url: '../login/login'
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

  }
})