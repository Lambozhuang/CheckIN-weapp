App({
  globalData: {
    loginFlag: 0,
    userInfo: {
      name: '',
      id: '',
      school: '---',
    },
    isTeacher: false,
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
    if (_this.globalData.loginFlag === 1) {
      wx.getStorage({
        key: 'userData',
        success(res) {
          _this.globalData.userInfo = res.data;
          console.log('用户缓存数据读取成功');
        }
      });
    }
  }
})