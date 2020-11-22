// pages/teacher/teacher_setting.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        toast: false,
        hideToast: false,
        username_empty_msg: false,
        pass_error_msg: false,
        pass_unequal_msg: false,
        pass_empty_msg: false,
        please_input_msg: false,
        update_confirm_msg: false,
        logout_confirm_msg: false,
        msg: false,
        // new_user_name=old username
        new_user_name: '',
        old_pass: '',
        new_pass1: '',
        new_pass2: '',
        teacher_id: []
    },

    getInputUser: function(e) {
        this.setData({
            new_user_name: e.detail.value
        });
    },

    getOldPass: function(e) {
        this.setData({
            old_pass: e.detail.value
        });
    },

    getNewPass1: function(e) {
        this.setData({
            new_pass1: e.detail.value
        });
    },

    getNewPass2: function(e) {
        this.setData({
            new_pass2: e.detail.value
        });
    },

    // show username empty msg
    showUsernameEmptyMsg: function() {
        this.setData({
            username_empty_msg: true,
            msg: true
        })
    },

    // show password error msg
    showPassErrMsg: function() {
        this.setData({
            pass_error_msg: true,
            msg: true
        })
    },

    // show password unequal msg
    showPassUnequalMsg: function() {
        this.setData({
            pass_unequal_msg: true,
            msg: true
        })
    },

    // show password empty msg
    showPassEmptyMsg: function() {
        this.setData({
            pass_empty_msg: true,
            msg: true
        })
    },

    // show please input msg
    showInputMsg: function() {
        this.setData({
            please_input_msg: true,
            msg: true
        })
    },

    // show update confirm msg
    showUpdateMsg: function() {
        // 没输入任何信息
        if (this.data.new_user_name == '' && this.data.old_pass == '') {
            this.showInputMsg()
            return
        }
        // 如果密码不正确...
        if (this.data.old_pass != '' && this.data.old_pass != 'old_pass') {
            this.showPassErrMsg()
            return
        }
        // 两次密码不相等
        if (this.data.new_pass1 != this.data.new_pass2) {
            this.showPassUnequalMsg()
            return
        }
        // 新密码为空
        if (this.data.old_pass != '' && this.data.new_pass1 == '') {
            this.showPassEmptyMsg()
            return
        }
        this.setData({
            update_confirm_msg: true,
            msg: true
        })
    },

    // logout confirm
    showLogoutMsg: function() {
        this.setData({
            logout_confirm_msg: true,
            msg: true
        });
    },

    // close msg
    close: function() {
        this.setData({
            username_empty_msg: false,
            pass_error_msg: false,
            pass_unequal_msg: false,
            pass_empty_msg: false,
            please_input_msg: false,
            update_confirm_msg: false,
            logout_confirm_msg: false,
            msg: false,
            // clear buffer
            new_user_name: '',
            old_pass: '',
            new_pass1: '',
            new_pass2: '',
        });
    },

    // update confirmed
    update() {
        // update info
        console.log('update teacher information')
        this.openToast()
        this.close()
    },

    // update success
    openToast: function() {
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
            }, 300);
        }, 3000);
    },

    // logout confirmed
    logout() {
        wx.reLaunch({
          url: '/pages/login/login',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            teacher_id: options.teacher_id
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