// components/mi_count/index.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['btn','count-text'],
  properties: {
    count:Number,
    quantityPurchased:Number,
    maxCount:{
      type:Number,
      value:5
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    decreaseHandler(){
      if(this.data.count===1){
        wx.showToast({
          title: '数量最少为1',
          icon: "none",
        })
        return;
      }
      this.triggerEvent("decrease",100,{
      }); //含有三个参数发出事件名、传递的参数、事件监听过程设置，形式为对象
    },
    increaseHandler(){
      console.log(this.data.count,this.data.quantityPurchased)
      if((this.data.count+this.data.quantityPurchased)>=this.data.maxCount){
        wx.showToast({
          title: '数量最多为'+this.data.maxCount,
          icon: "none",
        })
        return;
      }
      this.triggerEvent("increase",101,{});
    }
  }
})
