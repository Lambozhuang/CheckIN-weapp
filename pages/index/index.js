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
    teacherFlag: 0,

    theme: "light",
    qrcodeFgColor: "#00a2ff",
    qrcodeFgColor_grey: "#ededed",
    qrcodeBgColor: "#fefefe",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const _this = this;
    wx.getSystemInfo({
      success(res) {
        if (res.theme === "light") {
          _this.setData({
            qrcodeFgColor: "#00a2ff",
            qrcodeFgColor_grey: "#ededed",
            qrcodeBgColor: "#fefefe",
          });
        } else {
          _this.setData({
            qrcodeFgColor: "#7ad8ff",
            qrcodeFgColor_grey: "#535353",
            qrcodeBgColor: "#191919",
          });
        }
      }
    });
    wx.getStorage({
      key: 'loginFlag',
      success(res) {
        app.globalData.loginFlag = res.data;
        console.log('用户本地登录状态读取成功');
        if (app.globalData.loginFlag === 1) {

          wx.getStorage({
            key: 'teacherFlag',
            success(res) {
              app.globalData.teacherFlag = res.data;
              _this.setData.teacherFlag = res.data;
              console.log('老师身份信息读取成功');
            }
          });

          //获取缓存数据
          wx.getStorage({
            key: 'userData',
            success(res) {
              app.globalData.userInfo = res.data;
              console.log('用户缓存数据读取成功');

              //保持数据同步
              _this.setData({
                userInfo: {
                  name: app.globalData.userInfo.name,
                  id: app.globalData.userInfo.id,
                  school: app.globalData.userInfo.school,
                },
                loginFlag: app.globalData.loginFlag,
                teacherFlag: app.globalData.teacherFlag,
              });

              //首次绘制二维码
              const _currentTime = timeUtil.formatTime(new Date());
              drawQrcode({
                width: qrcode_w,
                height: qrcode_w,
                canvasId: 'myQrcode',
                text: commonUtil.compressInfo(app.globalData.userInfo, _currentTime),
                foreground: _this.data.qrcodeFgColor,
                background: _this.data.qrcodeBgColor,
              });
            }
          });
        } else {
          wx.navigateTo({
            url: '../login/login'
          });
        }
      },
      fail() {
        wx.navigateTo({
          url: '../login/login'
        });
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
    const _this = this;
    wx.onThemeChange((res) => {
      if (res.theme === "light") {
        _this.setData({
          qrcodeFgColor: "#00a2ff",
          qrcodeFgColor_grey: "#ededed",
          qrcodeBgColor: "#fefefe",
        });
      } else {
        _this.setData({
          qrcodeFgColor: "#7ad8ff",
          qrcodeFgColor_grey: "#535353",
          qrcodeBgColor: "#191919",
        });
      }
      if (_this.data.loginFlag === 0 || _this.data.teacherFlag === 1) {
        drawQrcode({
          width: qrcode_w,
          height: qrcode_w,
          canvasId: 'myQrcode',
          text: 'NULL',
          foreground: _this.data.qrcodeFgColor_grey,
          background: _this.data.qrcodeBgColor,
        });
      } else {
        //onShow首次绘制二维码
        const _currentTime = timeUtil.formatTime(new Date());
        drawQrcode({
          width: qrcode_w,
          height: qrcode_w,
          canvasId: 'myQrcode',
          text: commonUtil.compressInfo(app.globalData.userInfo, _currentTime),
          foreground: _this.data.qrcodeFgColor,
          background: _this.data.qrcodeBgColor,
        });
      }
    })
    //显示当前时间
    var interval = setInterval(function () {
      _this.setData({
        currentTime: timeUtil.formatTime(new Date()),
        loginFlag: app.globalData.loginFlag,
        teacherFlag: app.globalData.teacherFlag,
      });
    }, 1000);

    //保持数据同步
    this.setData({
      userInfo: {
        name: app.globalData.userInfo.name,
        id: app.globalData.userInfo.id,
        school: app.globalData.userInfo.school,
      },
    });

    //绘制空二维码
    if (_this.data.loginFlag === 0 || _this.data.teacherFlag === 1) {
      drawQrcode({
        width: qrcode_w,
        height: qrcode_w,
        canvasId: 'myQrcode',
        text: 'NULL',
        foreground: _this.data.qrcodeFgColor_grey,
        background: _this.data.qrcodeBgColor,
      });
    } else {
      //onShow首次绘制二维码
      const _currentTime = timeUtil.formatTime(new Date());
      drawQrcode({
        width: qrcode_w,
        height: qrcode_w,
        canvasId: 'myQrcode',
        text: commonUtil.compressInfo(app.globalData.userInfo, _currentTime),
        foreground: _this.data.qrcodeFgColor,
        background: _this.data.qrcodeBgColor,
      });
    }

    //循环绘制二维码，如果是老师或者未登录，则停止循环
    var interval2 = setInterval(function () {
      if (_this.data.teacherFlag === 1 || _this.data.loginFlag === 0) {
        clearInterval(interval2);
      } else {
        var _currentTime = timeUtil.formatTime(new Date());
        drawQrcode({
          width: qrcode_w,
          height: qrcode_w,
          canvasId: 'myQrcode',
          text: commonUtil.compressInfo(app.globalData.userInfo, _currentTime),
          foreground: _this.data.qrcodeFgColor,
          background: _this.data.qrcodeBgColor,
        });
      }

    }, 60000);

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