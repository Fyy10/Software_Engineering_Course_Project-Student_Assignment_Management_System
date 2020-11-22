// pages/teacher/lesson/student_info/student_info.js
const db=wx.cloud.database()//连接数据库
Page({

    /**
     * 页面的初始数据
     */
    data: {
        remove_confirm_msg: false,
        student_id:'',
        lesson_id:''
    },

    // remove confirm msg
    showRemoveMsg: function() {
        this.setData({
            remove_confirm_msg: true
        })
    },

    // close msg
    close: function() {
        this.setData({
            remove_confirm_msg: false
        });
    },

    // remove student confirmed
    removeStudent: function() {
        // delete
        console.log('remove student')
        wx.navigateBack({
          delta: 0,
        })
        wx.cloud.callFunction({
            name:"delstulesson",
            data:{
                lesson_id:this.data.lesson_id,
                student_id:this.data.student_id
            }
        }).then(res=>{
            console.log(res)
        })
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            student_id:options.student_id,
            lesson_id:options.lesson_id,
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