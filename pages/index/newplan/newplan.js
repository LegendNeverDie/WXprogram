const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  formSubmit:function(e){
    //接收表单数据并传递给父页面
    var that=this;
    var d=e.detail.value;
    if(d.planName.length<=0){
      //提示：计划名称不能为空
      wx.showToast({
        image:'/pages/image/wrong.png',
        title: '计划名称为空',
      });
    }else if(d.planTime.length<=0){
      //提示：计划时间不能为空
      wx.showToast({
        image: '/pages/image/wrong.png',
        title: '计划时间为空',
      });
    }else if(d.planType.length<=0){
      //提示：计划类型不能为空
      wx.showToast({
        image: '/pages/image/wrong.png',
        title: '计划类型为空',
      });
    }else if(d.planDesc.length<=0){
      //提示：计划描述不能为空
      wx.showToast({
        image: '/pages/image/wrong.png',
        title: '计划描述为空',
      });
    }else{
      var date=new Date();
      var t=date.getTime();
      var newplan=new Object();
      newplan.time=t;
      newplan.Time = date.toLocaleDateString();
      newplan.planName=d.planName;
      console.log("类型为"+d.planType);
      if(d.planType==1)newplan.planType=1;
      else newplan.planType=2;
      newplan.planTime=d.planTime;
      newplan.planDesc=d.planDesc;
      //剩余天数
      newplan.day1=d.planTime;
      //完成天数
      newplan.day2=0;
      //获取父页面并传值
      var planData=wx.getStorageSync("planData")||[];
      planData.push(newplan);
      wx.setStorageSync("planData", planData);
      wx.navigateBack({
        delta:1,
        success:function(res){
          //成功
          console.log("成功返回，新计划是");
          console.log(newplan);
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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