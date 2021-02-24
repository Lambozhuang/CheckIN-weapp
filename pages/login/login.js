// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    id: '',
    school: '---',
    schoolList: ['浙江工业大学', '浙江大学', '其他'],
    index: 0,
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
    if (app.globalData.loginFlag != 0) {
      this.setData({
        name: app.globalData.userInfo.name,
        id: app.globalData.userInfo.id,
        school: app.globalData.userInfo.school, 
      })
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

  //获取输入
  nameInput: function(e) {
    this.setData({
      name: e.detail.value
    })

  },
  idInput: function(e) {
    this.setData({
      id: e.detail.value
    })

  },

  //选择器改变
  pickerChange: function(e) {
    this.setData({
      index: e.detail.value,
      school: this.data.schoolList[e.detail.value]
    })
  },

  //按钮按下
  buttonTap: function() {
    if (this.data.name != ''
        && this.data.id != ''
        && this.data.school != '---') {
          app.globalData.loginFlag = 1;
          app.globalData.isTeacher = false;
          app.globalData.userInfo.name = this.data.name;
          app.globalData.userInfo.id = this.data.id;
          app.globalData.userInfo.school = this.data.schoolList[this.data.index];
          wx.navigateBack();
        }
  },

  //老师入口
  teacherLogin: function() {
    app.globalData.loginFlag = 1;
    app.globalData.isTeacher = true;
    app.globalData.userInfo.name = '***';
    app.globalData.userInfo.id = '************';
    app.globalData.userInfo.school = '********';
    wx.navigateBack({
      success() {
        wx.switchTab({
          url: '../checkList/checkList'
        });
      }
    });
  }


})