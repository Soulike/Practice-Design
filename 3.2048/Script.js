var blocks = [];
var row, col;//row为行，col为列
for (row = 0; row < 4; row++) {
    blocks[row] = [];
}
for (row = 0; row < 4; row++)
    for (col = 0; col < 4; col++)
        blocks[row][col] = 0;
var blocknumber = 0;//当前有数字的格子数
var key;
var score = 0;
document.getElementById('scores').innerHTML = '得分：' + score.toString();
randomput(2);
show();
//定义4*4的数组，所有数字初值为0。

function initialize()//初始化游戏
{
    for (row = 0; row < 4; row++)
        for (col = 0; col < 4; col++)
            blocks[row][col] = 0;
    blocknumber = 0;//当前有数字的格子数
    score = 0;
    document.getElementById('scores').innerHTML = '得分：' + score.toString();
    randomput(2);
    show();
}

function randomput(n) //随机在游戏区域中放置新的2
{
    with (Math) {
        var i = 0;
        var rowtemp, coltemp;
        while (i < n) {
            rowtemp = round(random() * 3);//0-3的随机数
            coltemp = round(random() * 3);
            if (blocks[rowtemp][coltemp] == 0)//如果可以放置
            {
                blocks[rowtemp][coltemp] = 2;
                blocknumber++;
                i++;
            }
        }
    }
}

function judge()//判断游戏能否继续运行，当表格全满时触发。能继续运行返回true，不能返回false
{
    var row, col;
    //先一行一行挨个遍历能否合并，再一列一列遍历能否合并
    for (row = 3; row >= 0; row--)//逐行
        for (col = 0; col < 3; col++) {
            if (blocks[row][col] == blocks[row][col + 1])
                return true;
        }
    for (col = 0; col < 4; col++)//逐列
        for (row = 2; row >= 0; row--) {
            if (blocks[row][col] == blocks[row + 1][col])
                return true;
        }
    return false;
}

function show() //刷新游戏界面，每次更改数组后调用
{
    var row, col;
    var element;
    for (row = 0; row < 4; row++)
        for (col = 0; col < 4; col++) {
            element = (row + 1).toString() + (col + 1).toString();
            document.getElementById('block' + element).className = 'n' + blocks[row][col].toString();
            if (blocks[row][col] != 0) {
                document.getElementById('block' + element).innerHTML = blocks[row][col].toString();
            }
            else {
                document.getElementById('block' + element).innerHTML = '';
            }
        }
}

function getcode(event) {
    key = event.keyCode;
    core();
}

function core() //游戏核心部分
{
    var row, col, row2, col2;
    var flag = 0;
    var win = 0;
    initial:
        switch (key) {
            case 119://向上
            {
                for (col = 0; col < 4; col++)//合并
                {
                    row:
                        for (row = 3; row >= 0; row--) {
                            for (row2 = row - 1; row2 >= 0; row2--) {
                                if (blocks[row2][col] != 0 && blocks[row][col] != blocks[row2][col])
                                    continue row;
                                if (blocks[row2][col] != 0 && blocks[row][col] == blocks[row2][col]) {
                                    blocks[row2][col] = 0;
                                    blocks[row][col] *= 2;
                                    score += blocks[row][col];
                                    document.getElementById('scores').innerHTML = '得分：' + score.toString();
                                    if (blocks[row][col] == 2048) {
                                        alert('你赢了！');
                                        initialize();
                                        win = 1;
                                        break initial;
                                    }
                                    blocknumber--;
                                }
                            }
                        }
                }
                for (col = 0; col < 4; col++)//移动
                {
                    for (row = 2; row >= 0; row--)
                        if (blocks[row][col] != 0) {
                            if (blocks[3][col] == 0) {
                                blocks[3][col] = blocks[row][col];
                                blocks[row][col] = 0;
                                flag = 1;
                                continue;
                            }
                            for (row2 = row + 1; row2 <= 3; row2++) {
                                if (blocks[row2][col] != 0) {
                                    blocks[row2 - 1][col] = blocks[row][col];
                                    if (row2 - 1 != row) {
                                        blocks[row][col] = 0;
                                        flag = 1;
                                    }
                                    break;
                                }
                            }
                        }
                }
                break;
            }
            case 115://向下
            {
                for (col = 0; col < 4; col++)//合并
                {
                    row:
                        for (row = 0; row <= 3; row++) {
                            for (row2 = row + 1; row2 <= 3; row2++) {
                                if (blocks[row2][col] != 0 && blocks[row][col] != blocks[row2][col])
                                    continue row;
                                if (blocks[row2][col] != 0 && blocks[row][col] == blocks[row2][col]) {
                                    blocks[row2][col] = 0;
                                    blocks[row][col] *= 2;
                                    score += blocks[row][col];
                                    document.getElementById('scores').innerHTML = '得分：' + score.toString();
                                    if (blocks[row][col] == 2048) {
                                        alert('你赢了！');
                                        initialize();
                                        win = 1;
                                        break initial;
                                    }
                                    blocknumber--;
                                }
                            }
                        }
                }
                for (col = 0; col < 4; col++)//移动
                {
                    for (row = 1; row <= 3; row++)
                        if (blocks[row][col] != 0) {
                            if (blocks[0][col] == 0) {
                                blocks[0][col] = blocks[row][col];
                                blocks[row][col] = 0;
                                flag = 1;
                                continue;
                            }
                            for (row2 = row - 1; row2 >= 0; row2--) {
                                if (blocks[row2][col] != 0) {
                                    blocks[row2 + 1][col] = blocks[row][col];
                                    if (row2 + 1 != row) {
                                        blocks[row][col] = 0;
                                        flag = 1;
                                    }
                                    break;
                                }
                            }
                        }
                }
                break;
            }
            case 97://向左
            {
                for (row = 0; row < 4; row++)//合并
                {
                    col:
                        for (col = 0; col <= 3; col++) {
                            for (col2 = col + 1; col2 <= 3; col2++) {
                                if (blocks[row][col2] != 0 && blocks[row][col] != blocks[row][col2])
                                    continue col;
                                if (blocks[row][col2] != 0 && blocks[row][col] == blocks[row][col2]) {
                                    blocks[row][col2] = 0;
                                    blocks[row][col] *= 2;
                                    score += blocks[row][col];
                                    document.getElementById('scores').innerHTML = '得分：' + score.toString();
                                    if (blocks[row][col] == 2048) {
                                        alert('你赢了！');
                                        initialize();
                                        win = 1;
                                        break initial;
                                    }

                                    blocknumber--;
                                }
                            }
                        }
                }
                for (row = 0; row < 4; row++)//移动
                {
                    for (col = 1; col <= 3; col++)
                        if (blocks[row][col] != 0) {
                            if (blocks[row][0] == 0) {
                                blocks[row][0] = blocks[row][col];
                                blocks[row][col] = 0;
                                flag = 1;
                                continue;
                            }
                            for (col2 = col - 1; col2 >= 0; col2--) {
                                if (blocks[row][col2] != 0) {
                                    blocks[row][col2 + 1] = blocks[row][col];
                                    if (col2 + 1 != col) {
                                        blocks[row][col] = 0;
                                        flag = 1;
                                    }
                                    break;
                                }
                            }
                        }
                }
                break;
            }
            case 100://向右
            {
                for (row = 0; row < 4; row++)//合并
                {
                    col:
                        for (col = 3; col >= 0; col--) {
                            for (col2 = col - 1; col2 >= 0; col2--) {
                                if (blocks[row][col2] != 0 && blocks[row][col] != blocks[row][col2])
                                    continue col;
                                if (blocks[row][col2] != 0 && blocks[row][col] == blocks[row][col2]) {
                                    blocks[row][col2] = 0;
                                    blocks[row][col] *= 2;
                                    score += blocks[row][col];
                                    document.getElementById('scores').innerHTML = '得分：' + score.toString();
                                    if (blocks[row][col] == 2048) {
                                        win = 1;
                                        alert('你赢了！');
                                        initialize();
                                        break initial;
                                    }

                                    blocknumber--;
                                }
                            }
                        }
                }
                for (row = 0; row < 4; row++)//移动
                {
                    for (col = 2; col >= 0; col--)
                        if (blocks[row][col] != 0) {
                            if (blocks[row][3] == 0) {
                                blocks[row][3] = blocks[row][col];
                                blocks[row][col] = 0;
                                flag = 1;
                                continue;
                            }
                            for (col2 = col + 1; col2 <= 3; col2++) {
                                if (blocks[row][col2] != 0) {
                                    blocks[row][col2 - 1] = blocks[row][col];
                                    if (col2 - 1 != col) {
                                        blocks[row][col] = 0;
                                        flag = 1;
                                    }
                                    break;
                                }
                            }
                        }
                }
                break;
            }
        }
    if (win == 0) {
        if (flag == 1) {
            randomput(1);
            show();
        }
        if (blocknumber == 16) {
            if (!judge()) {
                alert('游戏结束！');
                initialize();
            }
        }
    }
}