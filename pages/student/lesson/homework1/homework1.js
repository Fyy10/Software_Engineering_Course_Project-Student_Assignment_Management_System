// pages/homework1/homework1.js
const db=wx.cloud.database()
Page({

  //可同时上传九张照片到imgurl，重新上传不会覆盖之前的图片
  chooseImg: function () {
    let that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        if (that.data.imgurl.length != 0) {
          const imgurl_more = res.tempFilePaths
          const imgurl = that.data.imgurl.concat(imgurl_more)
          that.setData({
            imgurl,
          })
        } else {
          const imgurl = res.tempFilePaths
          that.setData({
            imgurl,
            hasImg: true,
          })
        }

      }
    })
  },
  //预览照片
  previewImg: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: this.data.imgurl,
    })
  },
  //作业提交上传到云数据库(待完成)
  submit: function (path) {
    console.log('submit')
    wx.cloud.callFunction({
      name:"upassign",
      data:{
        imgurl:this.data.imgurl,
        stuassign_id:this.data.stuassign_id
      }
    })
    this.openToast('提交成功')
  },

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: [],
    hasImg: false,
    stuassign_id:'',
    assignment_name:'',
    assignment_disc:'',
    assignment_id:'',
    toast: false,
    hideToastP: false
  },

  openToast: function (content) {
    this.setData({
      toast: true,
      toast_content: content
    });
    setTimeout(() => {
      this.setData({
        hideToast: true
      });
      setTimeout(() => {
        this.setData({
          toast: false,
          hideToast: false,
        });
      }, 300);
    }, 3000);
  },

  getAssignment(){
    db.collection("StuAssign").doc(this.data.stuassign_id).get()
    .then(res=>{
      console.log(res)
      this.setData({
        assignment_id:res.data.assignment_id,
        assignment_name:res.data.assignment_name
      })
      db.collection("assignmentlist").doc(this.data.assignment_id).get()
      .then(res=>{
        console.log(res)
        this.setData({
          assignment_disc:res.data.disc
        })
      })
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stuassign_id:options.stuassign_id
    })
    this.getAssignment()
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