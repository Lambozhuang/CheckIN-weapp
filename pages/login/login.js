// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: 'NULL',
    id: 'NULL',
    school: 'NULL',
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

  //获取输入
  nameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
    app.globalData.userInfo.name = e.detail.value;
  },
  idInput: function(e) {
    this.setData({
      id: e.detail.value
    })
    app.globalData.userInfo.id = e.detail.value;
  },
  schoolInput: function(e) {
    this.setData({
      school: e.detail.value
    })
    app.globalData.userInfo.school = e.detail.value;
  },

  //按钮按下
  buttonTap: function() {
    if (this.data.name != 'NULL'
        && this.data.id != 'NULL'
        && this.data.school != 'NULL') {
          app.globalData.loginFlag = 1;
          console.log(app.globalData.loginFlag);
          wx.navigateBack();
        }
  }
})