// pages/profile/profile.js
//
// Created by LamboTZ
// Copyright © 2021 LamboTZ. All rights reserved.
//
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
    },
    loginFlag: 0,
    teacherFlag: 0,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const _this = this;
    this.setData({
      userInfo: {
        name: app.globalData.userInfo.name,
        id: app.globalData.userInfo.id,
        school: app.globalData.userInfo.school,
      },
      loginFlag: app.globalData.loginFlag,
      teacherFlag: app.globalData.teacherFlag,
    });
  },

  //按钮按下
  buttonTap: function () {
    const _this = this;
    if (app.globalData.teacherFlag === 1) {
      wx.showModal({
        title: '是否退出老师模式？',
        success(res) {
          if (res.confirm) {

            //清空个人信息
            app.globalData.userInfo.name = '';
            app.globalData.userInfo.id = '';
            app.globalData.userInfo.school = '---';
            app.globalData.teacherFlag = 0;
            app.globalData.loginFlag = 0;
            _this.setData({
              loginFlag: 0,
              teacherFlag: 0,
            });

            //清空缓存
            wx.removeStorage({
              key: 'loginFlag',
            });
            wx.removeStorage({
              key: 'teacherFlag',
            });
            wx.removeStorage({
              key: 'userData'
            });
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