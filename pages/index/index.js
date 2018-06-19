//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    planData: [],
  },
  edit:function(e){
    var id=e.target.id;
    wx.navigateTo({
      url: '/pages/index/edit/edit?id='+id,
      success: function(res) {
        console.log("转至编辑页面，ID="+id);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function () {
    //数据处理
    var date=new Date();
    var t=date.getTime();
    //从缓存中获取数据
    var planData=wx.getStorageSync("planData");
    console.log("index页面-planData="+planData);

    for(var i=0;i<planData.length;i++){
      if (planData[i].planType == 1) {
        //计算剩余天数
        var d = planData[i].planTime - parseInt((t - planData[i].time) / (1000 * 60 * 60 * 24));
        planData[i].day1 = d;
        console.log("剩余天数=" + d);
      } else {
        //计算完成天数
        var d = parseInt((t - planData[i].time) / (1000 * 60 * 60 * 24));
        planData[i].day2 = d;
        console.log("完成天数=" + d);
      }
    }
    //更新数据
    wx.setStorage({
      key: 'planData',
      data: planData,
    })
    this.setData({
      planData:planData
    });
    /*
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    */
  },
  /*
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  */
  onShow: function () {
    var planData=wx.getStorageSync("planData");
    this.setData({
      planData:planData
    })
  }
})