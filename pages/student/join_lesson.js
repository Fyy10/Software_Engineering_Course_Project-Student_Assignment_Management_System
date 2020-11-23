// pages/student/join_lesson.js
const app = getApp()
const db=wx.cloud.database()//连接数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson_id6: '',
    student_id:'',
    student_name:''

  },

  inputLessonid: function (e) {
    this.setData({
        lesson_id6: e.detail.value
    })
  },

  submitForm() {
    var Flag=true
    db.collection("StuLesson").where({
      id:this.data.lesson_id6,
      student_id:this.data.student_id
    }).get().then(res=>{
      if(res.data>0){
        Flag=false//已经加入了课程
      }
    })
    if(Flag==true){
      wx.cloud.callFunction({
        name:"findid6",
        data:{
        lesson_id6:this.data.lesson_id6
      }
      }).then(res=>{
        console.log(res.result.data)
        var lesson=res.result.data
        console.log(lesson[0])
        if(lesson.length!=''){
          db.collection("StuLesson").add({
            data:{
              lesson_id:lesson[0]._id,
              student_id:this.data.student_id,
              student_name:this.data.student_name,
              name:lesson[0].name,
              id:this.data.lesson_id6
            }
          }).then(res=>{
            console.log(res)
          })
        }
        else{
          console.log("没有这个课程")
        }
      })
    }
    else{
      console.log("已经加入了课程")
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      student_id:options.student_id,
      student_name:options.student_name
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