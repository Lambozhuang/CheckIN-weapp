// pages/profile/profile.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      name: '',
      id: '',
      school: '',
    }
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
    this.setData({
      userInfo: {
        name: app.globalData.userInfo.name,
        id: app.globalData.userInfo.id,
        school: app.globalData.userInfo.school,
      }
    })
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

  //按钮按下
  buttonTap: function() {
    if (app.globalData.isTeacher === 1) {
      wx.showModal({
        title: '是否退出老师模式？',
        success(res) {
          if (res.confirm) {
            app.globalData.userInfo.name = '';
            app.globalData.userInfo.id = '';
            app.globalData.userInfo.school = '---';
            app.globalData.isTeacher = 0;
            wx.navigateTo({
              url: '../login/login'
            });
          }
          
        }
      });
    } else {
      wx.navigateTo({
        url: '../login/login'
      });
    }
    
  }
})