// pages/address_edit/index.js
let http = require('../../utils/http.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    model: {
      id: 0,
      receiveName: "",
      receivePhone: "",
      receiveRegion: "请选择省/市/区",
      receiveDetail: ""
    },
    editTtpe: true,
    flag: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 数据接受与初始化
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on('address_add', () => {
      this.setData({
        'model.id': 0,
        'model.receiveName': "",
        'model.receivePhone': "",
        'model.receiveRegion': "请选择省/市/区",
        'model.receiveDetail': "",
        editTtpe: true
      })
    });
    eventChannel.on('address_update', (address) => {
      this.setData({
        'model.id': address.id,
        'model.receiveName': address.receive_name,
        'model.receivePhone': address.receive_phone,
        'model.receiveRegion': address.receive_region,
        'model.receiveDetail': address.receive_detail,
        editTtpe: false
      })
    });
    if (this.data.editTtpe)
      wx.setNavigationBarTitle({
        title: '添加地址'
      })
    else
      wx.setNavigationBarTitle({
        title: '修改地址'
      })
  },

  // 数据绑定
  receiveChange(e) {
    let value=e.detail.value
    if(e.currentTarget.dataset.name==="model.receiveRegion"){
      value=e.detail.value.join(" ")
    }
    this.setData({
      [`${e.currentTarget.dataset.name}`]: value
    })
  },

  // 编辑操作
  async save() {
    this.check();
    if (this.data.flag) {
      let eventChannel = this.getOpenerEventChannel()
      if (this.data.editTtpe) {
        let i = await http({
          url: "/address/add",
          method: "POST",
          data: {
            receive_name: this.data.model.receiveName,
            receive_phone: this.data.model.receivePhone,
            receive_region: this.data.model.receiveRegion,
            receive_detail: this.data.model.receiveDetail
          }
        })
        this.setData({
          'model.id': i
        })
      } else {
        await http({
          url: "/address/update",
          method: "POST",
          data: this.data.model
        })
      }
      wx.lin.showToast({
        title: '操作成功~',
        icon: 'success',
        success: (res) => {
          // 管道选择
          eventChannel.emit(this.data.editTtpe ? "add" : "update", {
            'id': this.data.model.id,
            'receive_name': this.data.model.receiveName,
            'receive_phone': this.data.model.receivePhone,
            'receive_phone_encode': this.data.model.receivePhone.substr(0, 5) + '***' + this.data.model.receivePhone.substr(this.data.model.receivePhone.length - 3),
            'receive_region': this.data.model.receiveRegion,
            'receive_detail': this.data.model.receiveDetail,
          });
          wx.navigateBack();
        }
      })
    }
  },

  //删除提示开关
  open() {
    this.setData({
      show: !this.data.show
    })
  },

  // 删除
  async del() {
    let eventChannel = this.getOpenerEventChannel()
    let i = this.data.model.id
    await http({
      url: "/address/remove/" + i
    })
    wx.lin.showToast({
      title: '删除成功~',
      icon: 'success',
      success: (res) => {
        wx.navigateBack();
        eventChannel.emit("del", i);
        console.log(i)
      }
    })
  },

  //表单验证
  check() {
    let a = /[\u4e00-\u9fa5\w]{2,20}/g.test(this.data.model.receiveName);
    let b = /^[1][3,4,5,7,8][0-9]{9}$/g.test(this.data.model.receivePhone);
    let c = /.+/.test(this.data.model.receiveRegion);
    let d = /[\u4e00-\u9fa5\w]{5,}/g.test(this.data.model.receiveDetail);
    let prompt = "";
    if (a && b && c && d) {
      this.setData({
        flag: true
      })
    } else {
      if (this.data.model.receiveName.length < 2) {
        prompt = '收货人姓名不能小于2个字符'
      } else if (/[^\w\u4e00-\u9fa5]+/g.test(this.data.model.receiveName)) {
        prompt = '收件人名称不能含有特殊字符'
      } else if (/\d+/g.test(this.data.model.receiveName)) {
        prompt = '收件人名称不能包含数字'
      } else if (this.data.model.receivePhone == "") {
        prompt = '电话不能为空'
      } else if (!/\d{11}/g.test(this.data.model.receivePhone)) {
        prompt = '电话号码长度不对';
      } else if (!b) {
        prompt = '电话号码格式不对'
      } else if (this.data.model.receiveRegion === "请选择省/市/区") {
        prompt = '请选择地区'
      } else if (!/.{5,}/g.test(this.data.model.receiveDetail)) {
        prompt = '街道地址不能小于5个字符'
      }
      this.setData({
        flag: false
      })
      wx.lin.showToast({
        title: `${prompt}`
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