$(function() {
    var form = layui.form
    var layer = layui.layer

    var login_box = $(".login-box")
    var reg_box = $(".reg-box")

    $(".link_reg").on("click", function() {
        login_box.hide()
        reg_box.show()
    })
    $(".link_login").on("click", function() {
        reg_box.hide()
        login_box.show()
    })

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name="password"]').val()
            if (value !== pwd) {
                return "两次密码不一致！"
            }
        }
    })

    $("#reg_form").on("submit", function(e) {
        e.preventDefault()
        var username = $("#reg_form [name='username']").val()
        var password = $("#reg_form [name='password']").val()
        var data = { username: username, password: password }
        $.post("/api/reguser", data, function(res) {
            console.log(res)
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg("注册成功，请登录！")
            $(".link_login").click()
        })
    })

    $("#login_form").submit(function(e) {
        e.preventDefault()
        $.post("/api/login", $(this).serialize(), function(res) {
            console.log(res)
            if (res.status !== 0) {
                return layer.msg("登陆失败，用户名或密码错误！")
            }
            layer.msg("登陆成功")
            localStorage.setItem("token", res.token)
            location.href = "/index.html"
        })
    })
})