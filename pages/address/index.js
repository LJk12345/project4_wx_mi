// pages/address/index.js
let http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    emptyShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let list = await http({
      url: '/address/list'
    }, false)
    list.forEach(item=>{
      item.receive_phone_encode=item.receive_phone.substr(0,5)+'***'+item.receive_phone.substr(item.receive_phone.length-3);
    })
    this.setData({
      list,
      emptyShow: list ? false : true
    });
    console.log(list)
},

// 默认地址设置
async isDefault(e){
  console.log(e.target.dataset.id)
  await http({
    url: "/address/set_default/"+e.target.dataset.id,
  })
  let list= this.data.list;
    list.forEach(item=>{
        item.is_default=0;
        if(item.id===e.target.dataset.id) 
        item.is_default=1;
    })
    this.setData({
      list
    })
},

// 地址选择
chooseAddress(e) {
  let pages = getCurrentPages();
  let prevPage = pages[pages.length - 2];
  if (prevPage.route.indexOf("pages/order_confirm/index") !== -1) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    let address = this.data.list.find(item => item.id === id);
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.emit("done", {
      ...address
    });
    wx.navigateBack();
  }
},

// 添加地址
beginAdd() {
  wx.navigateTo({
    url: "/pages/address_edit/index",
    events: {
      add: (address) => {
        this.setData({
          list: [...this.data.list, address]
        })
      }
    },
    success: (res) => {
      res.eventChannel.emit("address_add");
    }
  })
},

// 地址修改
beginUpdate(e){
  let id = parseInt(e.currentTarget.dataset.id);
  let address = this.data.list.find(item => item.id === id)
  wx.navigateTo({
    url: "/pages/address_edit/index",
    events: {
      update: (address) => {
        let i = this.data.list.findIndex(item => item.id === address.id);
        // let temp=this.data.list;
        // temp.splice(i,1,address)
        this.setData({
          [`list[${i}]`]: address
        })
      },
      del:(id)=>{
        let arr=this.data.list;
        let i=this.data.list.findIndex(item => item.id === id);
        arr.splice(i,1);
        this.setData({
          list:arr
        })
      }
    },
    success: (res) => {
      res.eventChannel.emit("address_update", {
        ...address
      });
    }
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