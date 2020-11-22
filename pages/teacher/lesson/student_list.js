// pages/teacher/lesson/student_list.js
const db=wx.cloud.database()//连接数据库
Page({

    /**
     * 页面的初始数据
     */
    data: {
        student_list: ['DDD'],
        lesson_id:''
    },

    setStudents(){
        db.collection("StuLesson").where({
          lesson_id:this.data.lesson_id
        }).get()
        .then(res=>{
          console.log(res)
          this.setData({
            student_list:res.data
          })
        })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            lesson_id:options.lesson_id
        })
        this.setStudents()
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.setStudents()
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