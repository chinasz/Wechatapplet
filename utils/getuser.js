const app = getApp();
module.exports = {
  memberDetail: () =>{
    var member = wx.getStorageSync('cp_member');
    if(!member){
      app.util.request({
        url: 'entry/wxapp/getuserinfo',
        method: 'post',
        data: {},
        success: function (res) {
          wx.setStorage({
            key: "cp_member",
            data: res.data.data
          })
        }
      })
    }
  },
  updateusercb:function(){
    wx.removeStorage({
      key: 'cp_member',
    })
    wx.showToast({
      title: '保存成功',
      icon:'none'
    })

  }
}