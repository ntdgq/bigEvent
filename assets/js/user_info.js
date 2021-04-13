$(function () {

    const { form } = layui
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称不能超过6位'
            }
        }
    })
    initUserInfo()



    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                console.log(res);

                form.val('formUserInfo', res.data)
            }

        })
    }


    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！');
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })

})