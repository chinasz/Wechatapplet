// components/modalinput/modalinput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:''
    },
    confirmtxt:{
      type:String,
      value:'确定'
    },
    canceltxt:{
      type:String,
      value:'取消'
    },
    val:{
      type:String,
      value:''
    },
    colname:{
      type:String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hidewenum:true,
    input:null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    modal(e){
      this.setData({
        hidewenum: !this.data.hidewenum
      })
    },
    cancel(){
      this.setData({
        hidewenum: !this.data.hidewenum
      })
      this.triggerEvent('hidemodal');
    },
    confirm(e){
      //console.log(e,this.data.input);
      var input = this.data.input == null ?this.properties.val:this.data.input.trim();
      //if(!this.data.input.trim() && )
      if(!input){
        wx.showToast({
          title: this.properties.colname+'不能为空',
          icon: 'none'
        })
        input = '';
      }else if(input && input != this.properties.val){

        this.setData({
          hidewenum: !this.data.hidewenum
        })
      }else{

        this.setData({
          hidewenum: !this.data.hidewenum
        })
        input = '';
      }
      this.triggerEvent('Onsure', input);
    },
    change(e){
      this.setData({
        input: e.detail.value
      })
    }
  }
})
