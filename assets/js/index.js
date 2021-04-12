$(function () {

    getUserInfo();

    $('#btn_loginOut').on('click', function () {
        layer.confirm('确定退出？', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token');
            location.href = './login.html'

            //关闭弹出框
            layer.close(index)
        })
    })

});

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // complete: function (response) {
        //     console.log(response);
        //     const { status, message } = response.responseJSON
        //     if (status === 1 && message === '身份验证失败！') {
        //         location.href = './login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    const name = user.nickname || user.username;

    $('#welcome').html(`欢迎  ${name}`);

    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        const first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}