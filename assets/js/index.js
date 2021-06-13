$(function() {
    var layer = layui.layer

    function getUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败！")
                }
                renderAvatar(res.data)
            }
        })
    }

    getUserInfo()

    function renderAvatar(user) {
        var name = user.nickname || user.username
        $(".userinfo #welcome").html("欢迎&nbsp;&nbsp;" + name)
        if (user.user_pic !== null) {
            $(".userinfo .layui-nav-img").attr("src", user.user_pic).show()
            $(".userinfo .text-avatar").hide()
        } else {
            $(".userinfo .layui-nav-img").hide()
            $(".userinfo .text-avatar").text(name[0].toUpperCase()).show()
        }
    }

    $("#btnLogOut").on("click", function() {
        layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' }, function(index) {
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
                // 2. 重新跳转到登录页面
            location.href = '/login.html'
            layer.close(index)
        })
    })
})