// pages/teacher/teacher.js
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
        teacher_id:"",
        teacher_name: '',
        les:["1",'1']
    },

    //goto lesson list
    goLessonList: function() {
        wx.navigateTo({
          url: './lesson_list?teacher_id=' + this.data.teacher_id,
        })
    },

    //goto scoring page
    goGiveScore: function() {
        wx.navigateTo({
          url: './give_score?teacher_id=' + this.data.teacher_id,
        })
    },

    //goto teacher setting
    goTeacherSetting: function() {
        wx.navigateTo({
          url: './teacher_setting?teacher_id=' + this.data.teacher_id,
        })
    },

    setLessons(){
        wx.cloud.callFunction({
            name:"getLessons",
            data:{
                // test:"test",
                teacher_id: this.data.teacher_id
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
            teacher_id:options.teacher_id
        })
        db.collection("teacherlist").doc(this.data.teacher_id).get()
        .then(res=>{
            this.setData({
                teacher_name:res.data.name
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
        db.collection("teacherlist").doc(this.data.teacher_id).get()
        .then(res=>{
            this.setData({
                teacher_name:res.data.name
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
