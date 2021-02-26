App({
  globalData: {
    loginFlag: 0,
    userInfo: {
      name: '',
      id: '',
      school: '---',
    },
    isTeacher: 0,
    checkedList: [
      
    ],
    checkedNumber: 0,
  },
  onLaunch: function() {
    const _this = this;
    wx.getStorage({
      key: 'loginFlag',
      success(res) {
        _this.globalData.loginFlag = res.data;
        console.log('用户本地登录状态读取成功');
      }
    });
    wx.getStorage({
      key: 'teacherFlag',
      success(res) {
        _this.globalData.isTeacher = res.data;
        console.log('老师身份信息读取成功');
      }
    });
    if (_this.globalData.loginFlag === 1) {
      wx.getStorage({
        key: 'userData',
        success(res) {
          _this.globalData.userInfo = res.data;
          console.log('用户缓存数据读取成功');
        }
      });
    }
    wx.getStorage({
      key: 'checkedNumber',
      success(res) {
        _this.globalData.checkedNumber = res.data;
      }
    });
    if (_this.globalData.checkedNumber != 0) {
      wx.getStorage({
        key: 'checkedList',
        success(res) {
          _this.globalData.checkedList = res.data;
        }
      });
    }
    
  }
})