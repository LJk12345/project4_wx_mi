// pages/profile/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息获取授权状态；
    // 0 表示没有进行过授权询问
    // 1 请求授权用户授权
    // 2 请求授权用户不授权

    //用button设置open-type为getUserInfo总是可以弹出
    //系统自带的“获取用户信息授权窗口”，无论是不是第一次使用wx.getUserInfo()这个函数，无法触发系统自带的
    //“获取用户信息授权窗口”，所以往往是确定了用户已经授权
    //的情况下才调用这个函数，这就是小程序获取用户授权的重要套路知道。
    isUserInfo: false,
    nickName: "",
    avatarUrl: ""
  },
  getUserInfoHandler: function (res) {
    if (res.detail.errMsg === "getUserInfo:ok") {
      let userInfo = JSON.parse(res.detail.rawData);
      this.setData({
        isUserInfo: true,
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      })
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
    wx.getSetting({
      success: res => {
        //true       授权
        //false      未授权
        //undefined  从来没进行权限询问
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                isUserInfo: true,
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl
              });
            }
          });
        } else this.setData({isUserInfo: false,})
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

  }
})