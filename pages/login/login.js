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

  inputData: {
    name: '',
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      name: app.globalData.userInfo.name,
      id: app.globalData.userInfo.id,
      school: app.globalData.userInfo.school,
    });
  },

  //获取输入
  nameInput: function (e) {
    this.inputData.name = e.detail.value;
  },
  idInput: function (e) {
    this.inputData.id = e.detail.value;
  },

  //选择器改变
  pickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      school: this.data.schoolList[e.detail.value],
    })
  },

  //按钮按下
  buttonTap: function () {
    if (this.inputData.name != ''
      && this.inputData.id != ''
      && this.data.school != '---') {
      app.globalData.teacherFlag = 0;
      app.globalData.userInfo.name = this.inputData.name;
      app.globalData.userInfo.id = this.inputData.id;
      app.globalData.userInfo.school = this.data.schoolList[this.data.index];
      wx.setStorage({
        key: 'userData',
        data: app.globalData.userInfo,
        success() {
          console.log('用户数据缓存成功');
        },
      });
      app.globalData.loginFlag = 1;
      wx.setStorage({
        key: 'loginFlag',
        data: 1,
        success() {
          console.log('用户已在本地登录');
        }
      });
      app.globalData.teacherFlag = 0;
      wx.setStorage({
        key: 'teacherFlag',
        data: 0,
        success() {
          console.log('老师身份删除成功');
        }
      });
      wx.navigateBack();
    }
  },

  //老师入口
  teacherLogin: function () {
    app.globalData.userInfo.name = '';
    app.globalData.userInfo.id = '';
    app.globalData.userInfo.school = '---';
    wx.removeStorage({
      key: 'userData',
      success() {
        console.log('数据缓存删除成功');
      }
    });
    app.globalData.teacherFlag = 1;
    wx.setStorage({
      key: 'teacherFlag',
      data: 1,
      success() {
        console.log('老师身份记录成功');
      }
    });
    app.globalData.loginFlag = 1;
    wx.setStorage({
      key: 'loginFlag',
      data: 1,
      success() {
        console.log('老师用户已在本地登录');
      }
    });
    wx.navigateBack({
      success() {
        wx.switchTab({
          url: '../checkList/checkList'
        });
      }
    });
  }


})