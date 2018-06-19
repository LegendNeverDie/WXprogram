// pages/index/edit/edit.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit:{},
    id:0,
    ishidden:false,
    starsUrl:[
      "/pages/image/star2.png",
      "/pages/image/star1.png",
      "/pages/image/star1.png",
      "/pages/image/star1.png",
      "/pages/image/star1.png",
    ],
    stars:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var planData=wx.getStorageSync("planData");
    var id=options.id;
    var plan=planData[id];
    this.setData({
      edit:plan,
      id:id
    })
    console.log("成功进入编辑页面,plan=");
    console.log(plan);
  },
  formSubmit:function(e){
    //接收表单数据并传递给父页面
    var that = this;
    var data=that.data.edit;
    var d = e.detail.value;
    var ischange=false;
    var plantype=0;
    if(d.planType=="类型一")plantype=1;
    else plantype=2;
    if (d.planName.length > 0) {
      data.planName=d.planName;
      ischange=true;
    } else if (d.planTime.length > 0) {
      data.planTime=data.planTime;
      ischange = true;
    } else if (plantype!=data.planType) {
      data.planType=plantype;
      ischange = true;
    } else if (d.planDesc.length > 0) {
      data.planDesc=d.planDesc;
      ischange = true;
    }
    if(ischange){
      var date = new Date();
      var t = date.getTime();
      data.time = t;
      var planData=wx.getStorageSync("planData");
      planData[that.data.id]=data;
      wx.setStorage({
        key: 'planData',
        data: planData,
      })
    }
    wx.navigateBack({
      delta:1,
      success:function(res){
        console.log("成功从编辑页面返回");
      }
    })
  },
  deleteP:function(){
    var planData=wx.getStorageSync("planData");
    planData.splice(this.data.id,1);
    wx.setStorage({
      key: 'planData',
      data: planData,
    });
    wx.navigateBack({
      delta:1,
      success:function(res){
        console.log("成功删除计划并返回");
      }
    })
  },
  changeStar:function(e){
    var index = e.currentTarget.dataset.index;
    var starsUrl=this.data.starsUrl;
    for(var i=0;i<5;i++){
      if(i<=index){
        starsUrl[i]="/pages/image/star2.png";
      }else{
        starsUrl[i]="/pages/image/star1.png";
      }
    }
    this.setData({
      starsUrl:starsUrl,
      stars:index+1
    })
  },
  achieve:function(){
    this.setData({
      ishidden:true
    })
  },
  finishPlan:function(e){
    var that=this;
    var summary=e.detail.value.summary;
    var plan=that.data.edit;
    plan.summary=summary;
    plan.planStar=that.data.stars;
    var historyPlan=wx.getStorageSync("historyPlan")||[];
    var stars=wx.getStorageSync("stars")||0;
    var planstarNum=wx.getStorageSync("planstarNum")||[0,0,0,0,0];
    console.log("historyPlan=")
    console.log(historyPlan);
    historyPlan.push(plan);
    stars+=this.data.stars;
    planstarNum[this.data.stars-1]++;
    wx.setStorageSync("historyPlan", historyPlan);
    wx.setStorageSync("stars", stars);
    wx.setStorageSync("planstarNum", planstarNum);
    var planData=wx.getStorageSync("planData");
    planData.splice(that.data.id,1);
    wx.setStorageSync("planData", planData);
    wx.navigateBack({
      delta:1,
      success:function(res){
        console.log("完成计划并返回，计划情况："),
        console.log(plan)
      }
    })
  },
  goback:function(){
    this.setData({
      ishidden:false
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