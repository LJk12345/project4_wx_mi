// pages/category/index.js

let http=require('../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listMain: [],
    listSub: [],
    activeId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    //一级分类的数据
    let data=await http({url:"/category/list/0"});
    //请求一级对应的二级分类的数据
    let data2=await http({url:"/category/list/"+data[0].id});
    //同一更新
    this.setData({
      listMain:data,
      activeId:data[0].id,
      listSub:data2
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  async toggleId(e){
   let id=parseInt(e.currentTarget.dataset.id);
   if(id===this.data.activeId) return;
   let data=await http({url:"/category/list/"+id});
   this.setData({
     activeId:id,
     listSub:data
   })
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