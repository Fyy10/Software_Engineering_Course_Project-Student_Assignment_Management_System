// pages/login/teacher/lesson/assignment/assignment_detail.js
const db=wx.cloud.database()//连接数据库
Page({

    /**
     * 页面的初始数据
     */
    data: {
        student_list: [{name: "学生1", score: 95}, {name: "学生2", score: ""}],
        assignment_id:"",
        assignment_name:"",
        assignment_disc:""
    },

    giveScore: function() {
        wx.navigateTo({
          url: './student_submission',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            assignment_id:options.assignment_id
        })
        db.collection("assignmentlist").doc(this.data.assignment_id).get()
        .then(res=>{
            this.setData({
                assignment_name:res.data.name,
                assignment_disc:res.data.disc
            })
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