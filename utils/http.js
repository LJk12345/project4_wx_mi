let baseUrl="http://192.168.1.104:1314";

function http(options,withLoading=true){
  options.url=baseUrl+options.url;
  let defaultOptions={
    method:"GET",
    dataTye:"json",
    header:{
      "content-type":"application/json",
      "authorization":wx.getStorageSync("token")
    }
  };
  let requestOptions = Object.assign({},defaultOptions,
  options);
  //发送ajax
  return new Promise(function(resolve,reject){
    if(withLoading) wx.showLoading({title: 'loading...',mask: true});
    setTimeout(()=>{
      wx.request({
        ...requestOptions,
        success:({data:{code,data,msg}})=>{
          switch (code) {
            case 200:
            resolve(data);
              break;
            case 401:
            case 404:
            case 199:
            case 500:
              wx.lin.showToast({
                title: msg,
                icon: 'error'
              })
              // wx.showToast({
              //   title: msg,
              //   duration: 3000,
              //   icon: "none"
              // })
          }
        },
        fail: error => {
          console.log(error.errMsg);
          wx.showToast({title: '网络请求失败！',duration: 3000,icon: "none"});
        },
        complete:()=>{
          if(withLoading) wx.hideLoading()
        }
    });
    },800);
});
}
//commonJS
module.exports=http;

