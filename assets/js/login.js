$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()

    });
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()

    });


    //定义校验规则
    const { form, layer } = layui;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码不符合规则'],
        repwd(res) {
            const pwd = $('.reg-box [name=password]').val();
            if (res !== pwd) return '俩次密码不一致'
        }
    })

    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            url: '/api/reguser',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log('注册成功');
                layer.msg('注册成功')
                $('#link_login').click();
            }
        })

    })

    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')

                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = './index.html';
            }
        })
    })
})