// pages/student/student.js
const db=wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputShowed: false,
        inputVal: "",
        match_list: [],
        lesson_list: [],
        student_id:"",
        student_name: '',
        les:["1",'1']
    },

    //goto lesson list
    goLessonList: function() {
        console.log(this.data.student_id)
        wx.navigateTo({
          url: './lesson_list?student_id=' + this.data.student_id,
        })
    },

    //goto scoring page
    goJoinLesson: function() {
        wx.navigateTo({
          url: './join_lesson?student_id=' + this.data.student_id+'&student_name='+this.data.student_name,
        })
    },

    //goto student setting
    goStudentSetting: function() {
        wx.navigateTo({
          url: './student_setting?student_id=' + this.data.student_id,
        })
    },

    setLessons(){
        wx.cloud.callFunction({
            name:"getLessonsStu",
            data:{
                // test:"test",
                student_id: this.data.student_id
            }
        }).then(res=>{
            this.setData({
                lesson_list:res.result.data
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            student_id:options.student_id
        })
        db.collection("studentlist").doc(this.data.student_id).get()
        .then(res=>{
            this.setData({
                student_name:res.data.name
            })
        })
        this.setLessons()
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
        db.collection("studentlist").doc(this.data.student_id).get()
        .then(res=>{
            this.setData({
                student_name:res.data.name
            })
        })
        this.setLessons()
        console.log(this.data.lesson_list)
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
});
