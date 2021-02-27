App({
  globalData: {
    loginFlag: 0,
    userInfo: {
      name: '',
      id: '',
      school: '---',
    },
    teacherFlag: 0,
    checkedList: [

    ],
    checkedNumber: 0,
    completeReadingCaches: 0,
  },
  onLaunch: function () {
    const _this = this;

    //读取列表缓存
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