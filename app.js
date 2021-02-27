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
    completeReadingCaches: 0,
  },
  onLaunch: function () {
    const _this = this;
    
    wx.getStorage({
      key: 'teacherFlag',
      success(res) {
        _this.globalData.isTeacher = res.data;
        console.log('老师身份信息读取成功');
      }
    });

    wx.getStorage({
      key: 'checkedNumber',
      success(res) {
        _this.globalData.checkedNumber = res.data;
        if (_this.globalData.checkedNumber != 0) {
          wx.getStorage({
            key: 'checkedList',
            success(res) {
              _this.globalData.checkedList = res.data;
            }
          });
        }
      }
    });

  }
})