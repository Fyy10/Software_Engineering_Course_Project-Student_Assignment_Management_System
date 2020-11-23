// pages/homework_index/homework_index.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assignment_list: [
      {
        assignment_name: '作业1',
        status: '未完成',
        score: ''
      },
      {
        assignment_name: '作业2',
        status: '未完成',
        score: ''
      },
      {
        assignment_name: '作业3',
        status: '已完成',
        score: ''
      },
      {
        assignment_name: '作业1',
        status: '已批改',
        score: 96
      }
    ],
    student_id:'',
    lensson_id:''
  },

    getAssign(){
      db.collection("StuAssign").where({
        student_id:this.data.student_id
      }).get().then(res=>{
        this.setData({
          assignment_list:res.data
        })
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      student_id:options.student_id,
      lensson_id:options.lensson_id
    })
    this.getAssign()

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