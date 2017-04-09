/**
 * Created by 31641 on 2017-1-31.
 */
$(
    function ()
    {
        let emailReg = /^(\w[A-z]*[0-9]*[A-z]*)+@\w([A-z]*[0-9]*[A-z]*\.)+[A-z]+$/;
        let passwordReg = /^[A-z]+[0-9]+\w*$/;
        let $username = $('#username');
        let $password = $('#password');
        let $usernameMsg = $('#usernameMsg');
        let $passwordMsg = $('#passwordMsg');
        let $form = $('form');
        let $submitMsg = $('#submitMsg');
        let $ajaxBtn = $('#ajaxBtn');
        let $imageArea = $('#imageArea');

        setInterval(function ()
        {
            let image;
            let i = Math.round(Math.random() * 7 + 1);
            image = "url(images/image" + i + ".jpg)";
            $imageArea.css("backgroundImage", image);
        }, 5000);

        /*检测用户名格式是否正确，返回false的情况下将阻止提交*/
        function checkUsername()
        {
            let username = $username.val();
            /*如果用户名为空则恢复白色背景，返回false*/
            if (!username)
            {
                $username.css("backgroundColor", "white");
                $usernameMsg.text('');
                return false;
            }
            /*如果用户名符合格式*/
            else if (emailReg.test(username))
            {

                $usernameMsg.text('Great！');
                $username.css("backgroundColor", "white");
                return true;
            }
            /*如果用户名不符合格式*/
            else
            {
                $usernameMsg.text('Wrong format. Please Check.');
                $username.css("backgroundColor", "red");
                return false;
            }
        }

        /*检测密码格式是否正确，返回false的情况下将阻止提交*/
        function checkPassword()
        {
            let password = $password.val();
            /*如果密码为空，同上*/
            if (!password)
            {
                $passwordMsg.text('');
                $password.css("backgroundColor", "white");
                return false;
            }
            /*如果密码长度小于6*/
            else if (password.length < 6)
            {
                $passwordMsg.text('At least 6 characters!');
                $password.css("backgroundColor", "red");
                return false;
            }
            /*如果密码符合要求*/
            else if (passwordReg.test(password))
            {
                $passwordMsg.text('Great!');
                $password.css("backgroundColor", "white");
                return true;
            }
            /*如果密码不符合要求*/
            else
            {
                $passwordMsg.text('Wrong password format. Please check.');
                $password.css("backgroundColor", "red");
                return false;
            }
        }

        /*当表单提交事件发生时执行操作，如果有任何一个检查不通过都将阻止提交并显示错误消息*/
        $form.submit(
            function (event)
            {
                if (checkPassword() === false || checkUsername() === false)
                {
                    event.preventDefault();
                    $submitMsg.text('Incorrect information. Please check.');
                    $password.val('');//清空密码框
                }
                else
                {
                    $submitMsg.text('Submitting……');
                }
            }
        );

        /*当按下请求Ajax的按钮时执行操作*/
        $ajaxBtn.click(
            function (event)
            {
                if (checkPassword() === false || checkUsername() === false)
                {
                    event.preventDefault();
                    $submitMsg.text('Incorrect information. Please check.');
                    $password.val('');//清空密码框
                }
                else
                {
                    $submitMsg.text('Submitting……');
                    let data = {};//创建对象用于存储数据
                    data.username = $username.val();//添加username
                    data.password = $password.val();//添加password
                    /*ajax操作部分*/
                    $.ajax(
                        {
                            url: 'http://localhost:3000',
                            method: 'post',
                            dataType: 'text',
                            timeout: '10000',
                            data: data,
                            success: function (response)
                            {
                                $submitMsg.text(response.toString());
                            },
                            error: function ()
                            {
                                $submitMsg.text('Error!');
                            }
                        }
                    );
                    event.preventDefault();//阻止跳转
                    $password.val('');//清空密码框
                }
            }
        );
        /*每当用户在输入框中输入字符或焦点离开输入框即检查字符串合法性*/
        $username.click(checkUsername);
        $username.keyup(checkUsername);
        $username.blur(checkUsername);
        $password.click(checkPassword);
        $password.keyup(checkPassword);
        $password.blur(checkPassword);
    });

