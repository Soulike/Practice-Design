$(function ()
{
    let $backToTop = $('#backToTop');
    if ($(window).scrollTop() < 500)
        $backToTop.hide();
    $(window).scroll(
        function ()
        {
            if ($(window).scrollTop() > 500)
            {
                $backToTop.show().css({'opacity': '0.25', 'cursor': 'pointer'});
            }
            else
            {
                $backToTop.css({'opacity': '0', 'cursor': "default"});
            }
        }
    );

    $backToTop.mouseover(function ()
    {
        if ($(window).scrollTop() > 500)
            $backToTop.css('opacity', '0.8');
    });

    $backToTop.mouseleave(function ()
    {
        if ($(window).scrollTop() > 500)
            $backToTop.css('opacity', '0.25');
    });

    let $form = $('form');
    let $name = $('#name');
    let $class = $('#class');
    let $phone = $('#phone');
    let $number = $('#number');
    let $message = $('#message');
    let $submitMessage = $('#submitMessage');
    let $input = $('#name,#class,#phone,#number,#message');
    let classReg = /^软[日国]?[0-9]{4}班$/;
    let phoneReg = /^1[0-9]{10}$/;
    let numberReg = /^20[0-9]{7}$/;
    $form.submit(
        function (event)
        {
            let name = $name.val();
            let classNum = $class.val();
            let phone = $phone.val();
            let number = $number.val();
            let message = $message.val();
            let theMessage = '你的 ';
            if (name.length === 0)
            {
                theMessage += '名字 ';
            }
            if (classReg.test(classNum) === false)
            {
                theMessage += '班级 ';
            }
            if (phoneReg.test(phone) === false)
            {
                theMessage += '手机号 ';
            }
            if (numberReg.test(number) === false)
            {
                theMessage += '学号 ';
            }
            if (message.length === 0)
            {
                theMessage += '想说的话 ';
            }
            theMessage += '没有填写好。';
            if (theMessage.length !== 9)
            {
                event.preventDefault();
                $submitMessage.css('opacity', '1');
                $submitMessage.text(theMessage);
            }
        }
    );
    $input.focus(function ()
    {
        $submitMessage.css('opacity', '0');
    })
});

function scrollToId(id)
{
    $(id).HoverTreeScroll(500);
}