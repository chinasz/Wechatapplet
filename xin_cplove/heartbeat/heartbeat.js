//heartbeat.js
const app = getApp();
Page({
  data: {
    
  },
  getheart:function(){
    app.util.request({
      url:'',
      data:{},
      method:'post',
      success:function(res){
        
      }
    })
  },
  onLoad: function () {
    
  }
})
