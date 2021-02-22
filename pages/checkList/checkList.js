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

  scanCode: function() {
    const _this = this;
    wx.scanCode({
      success(res) {
        const _tempUserInfo = commonUtil.decompressInfo(res.result);
        const _checkedList = [..._this.data.checkedList, _tempUserInfo];
        const _checkedNumber = _this.data.checkedNumber + 1
        console.log(_tempUserInfo);

        _this.setData({
          checkedList: _checkedList,
          checkedNumber: _checkedNumber
        });
      }
    });
  },



})