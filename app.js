const http = require("./utils/http")

// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success:async res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let token=await http({
          url:"/user/login/"+res.code
        });
        wx.setStorageSync("token", token);

        let cartList= await http({
          url: "/cart/list", //一定写服务器前缀,返回promise函数
        }, false)
        cartList.forEach(item => {
          //数据动态开辟
          item.checked1 = true;
          item.checked2 = false;
        });
        this.globalData.cartList=cartList;

      }
    })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    cartList: []
  }
})
