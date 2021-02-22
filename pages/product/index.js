const http = require("../../utils/http");
// pages/product/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    anchorPoint:"top", //锚点
    quantityPurchased:0, //已选择的数量
    maskShow: false,   //遮罩层开关
    addShop: false,    //添加购物车的方式
    orderCount:0,      //购物车数量
    selectMask: "num", //弹窗类型
    banner: [],    //轮播图
    otherImgs: [], //详情图片
    product: {},   //商品对象
    current: 0,    // 轮播图下标
    count: 1,      //数量
    address: [],   //地址列表
    opacity:0,     //导航栏透明程度
    rate:750/wx.getSystemInfoSync().windowWidth,  //1px=？rpx的转换率
    detailTop:wx.getSystemInfoSync().windowHeight //可用窗口高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 获取商品信息
    let product = await http({
      url: "/product/model/" + parseInt(options.id) 
    })
    
    // 获取地址信息
    let address = await http({
      url: '/address/list'
    })
    
    this.setData({
      product,
      banner: product.bannerImgs.split(","),
      otherImgs: product.otherImgs.split(","),
      address
    })
  },
  //滚动事件
  scroll(e) {
    let query = wx.createSelectorQuery();
    query.select('.page-header').boundingClientRect(rect => {
      this.setData({
        opacity: e.detail.scrollTop / rect.height,
        scrollTop:e.detail.scrollTop
      })
    }).exec();
    query.select('.productDetails').boundingClientRect(rect => {
     this.setData({
      detailTop:rect.top*this.data.rate
     })
    }).exec();
  },
  // 获取轮播图当前展示页标
  GetBannerPage(e) {
    this.setData({
      current: e.detail.current
    })
  },
  // //数量选择
  // ChangeCount(e) {
  //   console.log(e)
  //   this.setData({
  //     count: e.detail.count
  //   })
  // },

  //关闭数量选择框
  CountMask(e) {
    this.setData({
      maskShow: !this.data.maskShow,
      selectMask: e.currentTarget.dataset.masktype,
      addShop: false
    })
  },

  //关闭mask
  CloseMask() {
    this.setData({
      maskShow: false
    })
  },
  // 获得锚点
  getAnchorPoint(e){
      if(e.target.dataset.anchorpoint && this.data.opacity!==0){
        this.setData({
          anchorPoint:e.target.dataset.anchorpoint
        })
      }
  },
  // 数量操作
  decrease(){
    this.setData({
      count:this.data.count-1
    })
  },
  increase(){
    console.log(1)
    this.setData({
      count:this.data.count+1
    })
  },

  // 加入购物车方式选择
  countPopUp(){
    this.setData({
      maskShow:true,
      selectMask:"num",
      addShop:true
    })
  },
  async addOrder(){
    if(this.data.quantityPurchased<=5){
      await http({
        url:'/cart/add_product',
        method: "POST",
        data: {
            pid: this.data.product.id,
            count: this.data.count,
            price:this.data.product.price
        }
      })
      // let i=this.data.cartList.findIndex(item=>item.pid===this.data.product.id)
      // let count=this.data.count+this.data.quantityPurchased;
        this.setData({
          // [`cartList[${i}].count`]:count,
          count:1,
          orderCount:this.data.orderCount+this.data.count,
          maskShow: false,
        })
      wx.lin.showToast({
        title: '添加成功~',
        icon: 'success',
      }) 
    }else{
      wx.lin.showToast({
        title: '购买已达上限',
        icon: 'error'
      }) 
    }
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:async function () {
    //获取购物车列表
    let cartList= await http({
      url: "/cart/list", //一定写服务器前缀,返回promise函数
    }, false)
    //获取订单列表（所有订单）
    let orderList = await http({
      url: "/order/list/" + 1
    },false)
    
    let quantityPurchased=0;
    orderList.forEach(item=>item.details.forEach(item1=>
      {
        if(item1.pid===this.data.product.id)
        quantityPurchased+=item1.count
      }
      ))
    let orderCount=cartList.reduce((result, item) =>{
      return result+item.count;
    },0)
    this.setData({
      orderCount,
      quantityPurchased:cartList.filter(item=>item.pid===this.data.product.id).reduce((result, item)=>{ return result+item.count;},quantityPurchased),
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