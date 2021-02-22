// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: 100,
    init:false,
    lable: 0,
    service: [{periods:3,interestRate:2.22},{periods:12,interestRate:3.9} , {periods:9,interestRate:7.2}],
    serviceIndex:0
  },
  setLable(e){
    this.setData({
      init:true,
      lable:parseInt(e.currentTarget.dataset.lable) 
    })
  },
  selectService(e){
    this.setData({
      serviceIndex:e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      price:parseFloat(options.copeWith) 
    })
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

  }
})