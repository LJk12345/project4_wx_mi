// pages/order_confirm/index.js
const http = require('../../utils/http.js')
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    ids: [],
    orderList: [],
    discountPriceAll: 0,
    mask: false,
    money: 0,
    copeWith: 0,
    discountList:[],
    text: ''
  },
  // 获取选中的地址
  chooseAddress() {
    wx.navigateTo({
      url: '/pages/address/index',
      events: {
        done: (address) => {
          address.receive_phone =
            this.setData({
              address
            });
        }
      }
    })
  },
  // 弹层开关
  MaskSwitch() {
    this.setData({
      mask: !this.data.mask
    })
  },

  //跳转至支付页
  async toPay(){
    let orderNumber=await http({
      url: '/order/add',
      method:"POST",
      data:{
        ids:this.data.ids.join(","),
        account: this.data.copeWith,
        address_id: this.data.address.id
      }
    })
    wx.redirectTo({
      url: `/pages/pay/index?copeWith=${this.data.copeWith}`,
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let discountPriceAll = 0;
    let money = this.data.money;
    let eventChannel = this.getOpenerEventChannel();
    //默认地址
    let address = await http({
      url: '/address/get_default'
    })
    address.receive_phone_encode = address.receive_phone.substr(0, 5) + '***' + address.receive_phone.substr(address.receive_phone.length - 3);

    
    //接收购物车选中的id
    eventChannel.on('listbyids', (arr) => {
      this.setData({
        ids: arr
      })
    });
   
    //订单商品
    let orderList = await http({
      url: '/cart/listbyids',
      method: "POST",
      data: {
        ids: this.data.ids
      }
    })
    await orderList.forEach(item => {
      item.discountName="有品秒杀";
      item.discountPrice = item.count * 100;    
      money = parseFloat(item.price * item.count + money);
      discountPriceAll= item.discountPrice+discountPriceAll
    });

    let copeWith = parseFloat(money - discountPriceAll)
    this.setData({
      address,
      orderList,
      discountPriceAll,
      money,
      copeWith
    })
  },
  // 留言获取
  message(e){
    this.setData({
      text:e.detail.value
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