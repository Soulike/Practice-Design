/**
 * Created by 31641 on 2016-12-3.
 */
var text, flag, result, iNums, iSigns;
var nums = new Array();
var signs = new Array();
initialize();
//初始化
function initialize() {
    result = 0;
    nums[0] = 0;
    iNums = 0;
    iSigns = 0;
    flag = 1;
    text = "";
}
//初始化并清屏
function reclear() {
    initialize();
    document.getElementById("screen").value = "";
}
//改变屏幕显示并保存数据
function show(n) {
    text += n;
    document.getElementById("screen").value = text;
    if (isNaN(n)) {
        signs[iSigns++] = n;
        nums[++iNums] = 0;
    }
    else {
        nums[iNums] = nums[iNums] * 10 + n;
    }

}
//按下等号时进行计算
function equal() {
    result = nums[0];
    out:
        for (var i = 0; i < iNums; i++) {
            switch (signs[i]) {
                case '+': {
                    result += nums[i + 1];
                    break;
                }
                case '-': {
                    result -= nums[i + 1];
                    break;
                }
                case '×': {
                    result *= nums[i + 1];
                    break;
                }
                case '÷': {
                    result /= nums[i + 1];
                    break;
                }
                default: {
                    alert("暂不支持括号运算。");
                    flag = 0;
                    break out;
                }
            }
        }
    //临时，在使用括号时弹出窗口
    if (flag) {
        text = text + '=' + result;
        document.getElementById("screen").value = text;
        document.getElementById("history").value = text;
    }
    else {
        document.getElementById("screen").value = '';
        document.getElementById("history").value = '';
    }
    initialize();
}

//悬停时改变背景
function BackGroundHover(obj) {
    obj.style.background = "#ff0000";
}
//离开时改回背景
function BackGroundNormal(obj) {
    obj.style.background = "#66ccff";
}
//按下时改变字体大小
function FontSizeOn(obj) {
    obj.style.fontSize = "Large"
}
//松开时恢复字体大小
function FontSizeNormal(obj) {
    obj.style.fontSize = "Larger"
}
