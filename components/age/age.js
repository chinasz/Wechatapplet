// components/age/age.js
Component({
  /**
   * 组件的属性列表
   */
  pageLifetimes:{
    show:function(){
      
    }
  },
  properties: {
    min:{
      type:Number,
    },
    max: {
      type: Number,
    },
    col: {
      type: Number,
    },
    val:{
      type:String,
      value:"请选择",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    agearr:null,
  },
  ready:function(){
    console.log(this.properties);
    var min = this.properties.min>0?this.properties.min:16;
    var max = this.properties.max > 0 ? this.properties.max : 50;
    var col = this.properties.col > 0 ? this.properties.col : 2;
    var arr = new Array();
    for (var i = min; i <= max; i++) {
      arr.push(i);
    }
    var tem = [];
    for (var i = 0; i < col; i++) {
      tem.push(arr);
    }

    this.setData({
      agearr: tem
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    szsz: function (e) {
      if(this.properties.col == 1){

        this.setData({
          val: this.properties.agearr[0][e.detail.value[0]]
        })

      }else if (this.properties.col == 2) {
        var temval = this.properties.val.split('-');
        if (this.properties.agearr[0][e.detail.value[0]] > this.properties.agearr[0][e.detail.value[1]]) {
          wx.showToast({
            title: '最小年龄不能大于最大年龄',
            icon: 'none'
          })
        } else {
          temval[0] = this.properties.agearr[0][e.detail.value[0]];
          temval[1] = this.properties.agearr[0][e.detail.value[1]];
          this.setData({
            val: temval.join('-')
          })
        }
      }
    }
  }
})
