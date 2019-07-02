/* labal.js */
const getuser = require('../../utils/getuser.js');
const app = getApp();
Page({
  data: {
    hiddenmodalput1: true,
    tag_type: null,
    tag_all:null,
    current:null,
    tag_list:null,
    custom_tag:null,
    custom_input:null,
  },
  custom:function(e){
    this.setData({
      custom_input:e.detail.value
    })
  }, 
  modalinput1: function () {
    this.setData({
      hiddenmodalput1: !this.data.hiddenmodalput1
    })
  },
  cancel1: function () {
    this.setData({
      hiddenmodalput1: true
    });
  },
  custom_confirm: function () {
    var tag = this.data.custom_input;
    var current = this.data.current || this.data.tag_list[0].tag_type;
    if(tag !=null && tag.trim()){
      this.data.tag_list.push({tag_name:tag.trim(),tag_type:current,select:true})
    }
    this.setData({
      hiddenmodalput1: true,
      tag_list:this.data.tag_list
    })
  },
  checkCurrent: function (e) {
    var that = this;
    var a = [];
    if (that.data.current != e.currentTarget.dataset.current){
      that.data.tag_all.map((v,i,o)=>{
        if (v.tag_type == e.currentTarget.dataset.current){
          a[i] = o[i];
        }
      
      })
      that.data.tag_list = [];
      that.data.tag_list = a;
      that.setData({
        tag_list:that.data.tag_list,
        current: e.currentTarget.dataset.current
      })
    }
  },
  gettag:function(){
    var that = this;
    app.util.request({
      url:'entry/wxapp/querytag',
      method:'post',
      success:function(res){
        getuser.memberDetail();
        
        wx.getStorage({
          key:'cp_member',
          success(re){
            let member = re.data;
            if (member.tag) {
              res.data.data[1].map((v, i, o) => {
                member.tag.map((tv) => {
                  if (v.tag_id == tv) {
                    o[i].select = true;
                  }
                })
              })
            }

            if (member.custom_tag) {
              member.custom_tag.map((v, i, o) => {
                o[i].select = true;
              })
              res.data.data[1] = res.data.data[1].concat(member.custom_tag);
            }

            that.setData({
              tag_type: res.data.data[0],
              tag_list: res.data.data[1],
              tag_all: res.data.data[1]
            })
          }
        })
       
      }
    })
  },
  selecttag:function(e){
    //选择标签
    var that = this
    var key = e.currentTarget.dataset.key;
    that.data.tag_list[key].select = !this.data.tag_list[key].select;

    that.setData({
      tag_list: that.data.tag_list,
    })
  },
  suretag:function(e){
    //提交
    let select_tag = [];
    let custom_tag = [];
    this.data.tag_all.map((v,i,o)=>{
      if(v.select === true){
        if(v.tag_id){
          select_tag.push(v.tag_id)
        }else{
          custom_tag.push(v.tag_type+'-'+v.tag_name)
        }
      }
    })

    if(select_tag.length>=1){
      app.util.request({
        url:'entry/wxapp/updatetag',
        data: { tag: select_tag.join(','), custom: custom_tag.join(',')},
        method:'post',
        success:function(res){
          if(res.data.errno == 0){
            getuser.updateusercb();
          }
        }
      })
    }
  },
  onLoad: function (options) {
    this.gettag();
    
  },
})