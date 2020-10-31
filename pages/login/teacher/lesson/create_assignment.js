// pages/login/teacher/lesson/create_assignment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        toast: false,
        hideToast: false,
        showTip: false,
        inputName: "",
        inputDisc: ""
    },

    getName: function(e) {
        this.setData({
            inputName: e.detail.value
        });
    },

    getDisc: function(e) {
        this.setData({
            inputDisc: e.detail.value
        });
    },

    Confirm: function() {
        console.log(this.data.inputName)
        console.log(this.data.inputDisc)
        if (this.data.inputName != "" && this.data.inputDisc != "") {
            this.setData({
                toast: true
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
                    wx.navigateBack({
                        delta: 0,
                      })          
                }, 300);
            }, 1000);    
        }
        else {
            // empty name or discription
            this.setData({
                showTip: true
            })
        }
    },

    closeTip: function() {
        this.setData({
            showTip: false
        })
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