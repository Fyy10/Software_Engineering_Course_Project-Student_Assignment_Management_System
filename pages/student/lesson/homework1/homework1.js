// pages/homework1/homework1.js
Page({





//可同时上传九张照片到imgurl，重新上传不会覆盖之前的图片
  chooseImg:function(){
    let that=this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        if (that.data.imgurl.length != 0){
          const imgurl_more = res.tempFilePaths
          const imgurl = that.data.imgurl.concat(imgurl_more)
          that.setData({
            imgurl,
            
          })
        }
        else{
          const imgurl = res.tempFilePaths
          that.setData({
            imgurl,
            hasImg:true,
          })
        }
        
      }
    })
  },
//预览照片
   previewImg:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: this.data.imgurl,
    })
  },
//作业提交上传到云数据库(待完成)
  submit:function(){

  },





  /**
   * 页面的初始数据
   */
  data: {
    imgurl:[],
    hasImg:false,



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