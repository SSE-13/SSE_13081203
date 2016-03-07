var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基类，负责处理x,y,rotation 等属性
 */
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (context) {
        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    };
    return Bitmap;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
        this.width = 100;
        this.height = 100;
        this.color = '#FF0000';
    }
    Rect.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.font = "20px Arial";
        this.color = '#000000';
        this.filltext = 'HelloWorld';
    }
    TextField.prototype.render = function (context) {
        context.font = this.font;
        context.fillStyle = this.color;
        context.fillText(this.filltext, 0, 20);
    };
    return TextField;
}(DisplayObject));
function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject = renderQueue[i];
        displayObject.draw(context);
    }
}
var imagePool = {};
function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function (imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;
        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        function onLoadError() {
            alert('资源加载失败:' + imageUrl);
        }
    });
}
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var rect = new Rect();
rect.width = 400;
rect.height = 400;
rect.color = '#00c7ce';
var rect2 = new Rect();
rect2.width = 400;
rect2.height = 150;
rect2.x = 0;
rect2.y = 250;
rect2.color = '#00c109';
var rect3 = new Rect();
rect3.width = 400;
rect3.height = 75;
rect3.x = 0;
rect3.y = 325;
rect3.color = '#2fb11d';
var text1 = new TextField();
text1.x = 80;
text1.y = 80;
text1.filltext = 'Soccer';
text1.font = "60px Showcard Gothic";
text1.color = '#f9aa45';
text1.rotation = Math.PI / 24 * (-1);
var text2 = new TextField();
text2.x = 83;
text2.y = 83;
text2.filltext = 'Soccer';
text2.font = "60px Showcard Gothic";
text2.color = '#ffffff';
text2.rotation = Math.PI / 24 * (-1);
var text3 = new TextField();
text3.x = 0;
text3.y = 140;
text3.filltext = 'Physics';
text3.font = "60px Showcard Gothic";
text3.color = "#f9aa45";
text3.rotation = Math.PI / 24 * (-1);
var text4 = new TextField();
text4.x = 3;
text4.y = 143;
text4.filltext = 'Physics';
text4.font = "60px Showcard Gothic";
text4.color = "#ffffff";
text4.rotation = Math.PI / 24 * (-1);
var text5 = new TextField();
text5.x = 250;
text5.y = 180;
text5.filltext = '2D';
text5.font = "95px Showcard Gothic";
text5.color = '#b1b1b1';
text5.rotation = Math.PI / 24 * (-1);
var text6 = new TextField();
text6.x = 253;
text6.y = 183;
text6.filltext = '2D';
text6.font = "95px Showcard Gothic";
text6.color = '#ffffff';
text6.rotation = Math.PI / 24 * (-1);
var bitmap = new Bitmap();
bitmap.source = 'wander-icon.jpg';
//渲染队列
var renderQueue = [rect, text2, text4, text6, rect2, rect3, text1, text3, text5];
//资源加载列表
var imageList = ['wander-icon.jpg'];
//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function () {
    drawQueue(renderQueue);
});
