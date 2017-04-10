window.onload = function() {
    waterfall('main', 'box');
}

function waterfall(parent, box) {
    //将main下的所有class=box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);
    console.log(oBoxs.length);
    //计算整个页面显示的列数（页面宽度／box的宽度）
    var oBoxW = oBoxs[0].offsetWidth;
    console.log(oBoxW);
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
    console.log(cols);
    oParent.style.cssText = 'width:' + oBoxW * cols + 'px;margin:0 auto';
    var hArr = new Array();
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < cols) {
            hArr.push(oBoxs[i].offsetHeight);
        } else {
            var minH = Math.min.apply(null, hArr);
            var index = getMinhIndex(hArr, minH);
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            oBoxs[i].style.left = index * oBoxW + 'px';
            hArr[index] += oBoxs[i].offsetHeight;
        }
    }
    console.log(minH);
}
//根据class获取元素
function getByClass(parent, clsName) {
    var boxArray = new Array(); //用来存储所有class=box的元素
    oElements = parent.getElementsByTagName('*');
    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
            boxArray.push(oElements[i]);
        }
    }
    return boxArray;
}

function getMinhIndex(arr, val) {
    for (var i in arr) {
        if (arr[i] == val) {
            return i;
        }
    }
}