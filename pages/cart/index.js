// pages/cart/index.js
const http = require('../../utils/http.js');
let app=getApp();
Page({
  /**
   * 页面的初始数据
   */

  data: {
    empty: true,
    show: true,
    cartList: [],
    isEdit: false,
    opacity: 0,
    listTop: 0
  },
  //滚动事件
  scroll(e) {
    this.setData({
      opacity: e.detail.scrollTop / this.data.listTop
    })
  },
  //管理模式确定
  cutIsEdit() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  // async getList() {
    // let data = await http({
    //   url: "/cart/list", //一定写服务器前缀,返回promise函数
    // }, false)
    // if (data.length != 0) this.setData({
    //   empty: false
    // });
    // else this.setData({
    //   empty: true
    // });
    // data.forEach(item => {
    //   //数据动态开辟
    //   item.checked1 = true;
    //   item.checked2 = false;
    // });
    // if (this.data.listTop === 0) {
    //   let query = wx.createSelectorQuery();
    //   query.select('.cart_list-content_list').boundingClientRect(rect => {
    //     this.setData({
    //       listTop: rect.top - 44,
    //     })
    //   }).exec();
    // }
    // this.setData({
    //   list: data
    // });
  // },
  getListTop(){
      let query = wx.createSelectorQuery();
      query.select('.cart_list-content_list').boundingClientRect(rect => {
        this.setData({
          listTop: rect.top - 44,
        })
      }).exec();
  },
  //全选
  toggleAllcheck() {
    let cartList = this.data.cartList;
    if (!this.data.isEdit) cartList.forEach(item => item.checked1 = !item.checked1)
    else cartList.forEach(item => item.checked2 = !item.checked2)
    this.setData({
      cartList
    })
  },
  //选择
  checked(e) {
    let cartList = this.data.cartList;
    let i = cartList.findIndex(item => item.id === e.currentTarget.dataset.id)
    if (!this.data.isEdit) cartList[i].checked1 = !cartList[i].checked1;
    else cartList[i].checked2 = !cartList[i].checked2;
    this.setData({
      cartList
    })
  },
  // 增加数量
  async increaseHandler(e) {
    await http({
      url: "/cart/increase/" + e.target.dataset.id
    })
    let i=this.data.cartList.findIndex(item=>item.id===e.target.dataset.id)
    this.setData({
      [`cartList[${i}].count`]:this.data.cartList[i].count+1
    })

  },
  // 减少数量
  async decreaseHandler(e) {
    await http({url: "/cart/decrease/" + e.target.dataset.id})
    let i=this.data.cartList.findIndex(item=>item.id===e.target.dataset.id)
    this.setData({
      [`cartList[${i}].count`]:this.data.cartList[i].count-1
    })
  },
  //移除商品
  async Removed() {
    let arr = [];
    this.data.cartList.forEach(item => {
      if (item.checked2) {
        arr.push(item.id)
      }
    })
    await http({
      method: "POST",
      url: "/cart/batch_remove",
      data: ({
        ids: arr
      })
    })
    let arr2 = [];
    this.data.cartList.forEach(item => {
      if (!item.checked2) {
        arr2.push(item)
      }
    })
    this.setData({
      cartList: arr2
    })
    wx.lin.showToast({
      title: '删除成功~',
      icon: 'success',
    })
  },
  //跳转订单确定页面
  pay(){
    let arr = [];
    this.data.cartList.forEach((item, index) =>{
      if(item.checked1) arr.push(item.id)
    })
    wx.navigateTo({
      url: '/pages/order_confirm/index',
      success: (res) => {
        res.eventChannel.emit("listbyids", arr);
      }
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function (options) {
    // this.getList()
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    let cartList= await http({
      url: "/cart/list", //一定写服务器前缀,返回promise函数
    })
      cartList.forEach(item => {
      //数据动态开辟
      item.checked1 = true;
      item.checked2 = false;
    });    
    app.globalData.cartList=cartList
    // app.globalData.cartList.forEach(item=>{
    //   item.checked1=true;
    //   item.checked2=false
    // })
    // let cartList=app.globalData.cartList;
    this.setData({
            cartList,
            empty: cartList.length===0 ?  true : false ,
            isEdit:false
          })
    if(this.data.listTop === 0) this.getListTop()
    
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