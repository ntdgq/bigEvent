$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.token || ''
        }
        options.complete = function (response) {
            // console.log(response);
            const { status, message } = response.responseJSON
            if (status === 1 && message === '身份验证失败！') {

                localStorage.removeItem('token');
                location.href = './login.html'
            }
        }
    }

});
