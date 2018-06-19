// pages/achievement/achievement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars:0,
    planstarNum:[0,0,0,0,0],
    num:0,
    isShow:false,
    isShow2:false
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
    var stars = wx.getStorageSync("stars") || 0;
    var planstarNum = wx.getStorageSync("planstarNum") || [0, 0, 0, 0, 0];
    console.log(planstarNum);
    console.log("lodding");
    var planData = wx.getStorageSync("planData") || [];
    var num = planData.length;
    var historyPlan = wx.getStorageSync("historyPlan");
    var isShow = false;
    var isShow2=false;
    for(var i=0;i<historyPlan.length;i++){
      if(historyPlan[i].day2>=100){
        isShow=true;
        break;
      }
    }
    if(planstarNum[0]+planstarNum[1]>=10)isShow2=true;
    this.setData({
      stars: stars,
      planstarNum: planstarNum,
      num: num,
      isShow: isShow,
      isShow2:isShow2
    })
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