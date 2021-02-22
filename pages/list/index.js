// pages/list/index.js

let http = require('../../utils/http.js');

Page({
  "enablePullDownRefresh":true,
  /**
   * 页面的初始数据
   */
  data: {
    rocketShow: false,
    showMode: true,
    list: [],
    isLoading: false,
    condition: {
      name: "",
      cid: 0,
      orderCol: "sale",
      orderDir: "asc",
      pageSize: 6,
      begin: 0
    },
    //标识是否处与加载中
    isTriggerLoadMore: false, //标识当前是否触发了加载更多
    hasMore: true, //标识当前是否还有数据没加载
  },
  //获取列表信息
  async getList(){
    let data = await http({
      url: "/product/list",
      method: "POST",
      data: this.data.condition
    });
    let temp=[];
    if(this.data.list.length!==0) temp=[...this.data.list,...data]
    else temp=data
    this.setData({
      list: temp,
      isLoading: false,
      hasMore: data.length === this.data.condition.pageSize
    });
  },
  async getListByName(){
    let data = await http({
      url: "/product/list",
      method: "POST",
      data: this.data.condition
    });
    this.setData({
      list: data,
      isLoading: false,
      hasMore: data.length === this.data.condition.pageSize
    });
  },
  //获取排序
  getOrderCol(e){
    this.setData({
      list:[],
      "condition.name":"",
      "condition.orderCol":e.currentTarget.dataset.sortclass,
      "condition.begin":0
    })
    this.getList();
  },
  //获取排序方向
  getOrderDir(e){
    this.setData({
      list:[],
      "condition.orderDir":e.currentTarget.dataset.sort,
      "condition.begin":0
    })
    this.getList();
  },
  //列表样式确定
  listMode(){
    this.setData({
      showMode:!this.data.showMode
    })
  },
  //文字查询
  searchText(e){
   this.setData({
    "condition.name":e.detail.value
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'condition.cid':parseInt(options.cid) 
    })
   this.getList();
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
  onPullDownRefresh: function (){
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.hasMore){
      this.setData({
        'condition.begin':this.data.condition.begin+6,
       })
       this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})