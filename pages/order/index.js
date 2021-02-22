// pages/order/index.js
const http = require('../../utils/http.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    laber: 0,
    labers: [{name: "全部",index: 0},
             {name: "已付款",index: 1},
             {name: "待付款", index: 2}],
    orderList: [],
    url: "/order/list_unpay"
  },
  async request() {
    let orderList = await http({
      url: "/order/list/" + parseInt(this.data.laber + 1)
    })
    this.setData({
      orderList
    })
  },
  //选项卡切换
  lableSwitch(e) {
    console.log(e)
    if (e.currentTarget.dataset.index === this.data.laber)
      return;
    this.setData({
      laber: e.currentTarget.dataset.index
    })
    this.request();
  },
  //删除订单
  delOrder(e) {
    console.log(e)
    let orderList = this.data.orderList
    let i = orderList.findIndex(item => item.order_id === e.target.dataset.orderId);
    orderList.splice(i, 1)
    this.setData({
      orderList
    })
  },

  //再次购买
  // async shop(e) {
  //   await this.data.orderList[e.target.dataset.index].details.map( async item=>{
  //     let cartList= await http({
  //       url: "/cart/list", //一定写服务器前缀,返回promise函数
  //     }, false)
  //     let orderList = await http({
  //       url: "/order/list/" + 1
  //     },false)
  //     let quantityPurchased=0;
  //     orderList.forEach(item1=>item1.details.forEach(item2=>
  //       {
  //         if(item2.pid===item.pid)
  //         quantityPurchased+=item2.count
  //       }
  //       ))
  //     quantityPurchased=cartList.filter(item1=>item1.pid===item.pid).reduce((result, item1)=>{ return result+item1.count;},quantityPurchased);
  //     console.log(quantityPurchased)
  //       if(quantityPurchased>=5){
  //         wx.lin.showToast({
  //           title: '添加失败最多可购买5个',
  //           icon: 'error',
  //         })
  //         return
  //       }
  //       else{
  //         await http({
  //           url: '/cart/add_product',
  //           method: "POST",
  //           data: {
  //             pid: item.pid,
  //             count: item.count,
  //             price: item.price
  //           }
  //         }) 
  //       }
  //   })
  //   wx.lin.showToast({
  //     title: '添加成功~',
  //     icon: 'success',
  //     success: (res) => {
  //       wx.switchTab({
  //         url: '/pages/cart/index'
  //       })
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.laber){
      this.setData({
        laber:2
      })
    }
    this.request();
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