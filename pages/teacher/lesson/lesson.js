// pages/lesson/lesson.js
const db=wx.cloud.database()//连接数据库

Page({

    /**
     * 页面的初始数据
     */
    data: {
        assignment_id_list: [],
        assignment_list: [],
        _id:'',
        teacher:''
    },

    CreateAssignment: function() {
        wx.navigateTo({
          url: './create_assignment?lesson_id='+this.data._id,
        });
    },

    setTeacher(){
        db.collection("lessonlist").doc(this.data._id).get()
        .then(res=>{
            console.log(res)
            this.setData({
                teacher:res.data,
                assignment_id_list:res.data.assign_id,
                assignment_list:res.data.assignname
            })
        })
    },

    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            _id:options._id
        })
        this.setTeacher()
        console.log(this.data.teacher)
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