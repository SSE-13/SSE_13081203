/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {
    
    font = "20px Arial";
    color = '#000000';
    filltext = 'HelloWorld';

    render(context: CanvasRenderingContext2D) {
        context.font = this.font;
        context.fillStyle = this.color;
        context.fillText(this.filltext, 0, 20);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
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
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


var rect = new Rect();
rect.width = 400;
rect.height = 400;
rect.color = '#00c7ce'


var rect2 = new Rect();
rect2.width = 400;
rect2.height = 150;
rect2.x=0;
rect2.y=250;
rect2.color = '#00c109'

var rect3 = new Rect();
rect3.width = 400;
rect3.height = 75;
rect3.x=0;
rect3.y=325;
rect3.color = '#2fb11d'

var text1 = new TextField();
text1.x = 80;
text1.y = 80;
text1.filltext = 'Soccer';
text1.font = "60px Showcard Gothic";
text1.color = '#f9aa45';
text1.rotation = Math.PI/24*(-1);

var text2 = new TextField();
text2.x = 83;
text2.y = 83;
text2.filltext = 'Soccer';
text2.font = "60px Showcard Gothic";
text2.color = '#ffffff';
text2.rotation = Math.PI/24*(-1);

var text3 = new TextField();
text3.x = 0;
text3.y = 140;
text3.filltext = 'Physics';
text3.font = "60px Showcard Gothic";
text3.color = "#f9aa45";
text3.rotation = Math.PI/24*(-1);

var text4 = new TextField();
text4.x = 3;
text4.y = 143;
text4.filltext = 'Physics';
text4.font = "60px Showcard Gothic";
text4.color = "#ffffff";
text4.rotation = Math.PI/24*(-1);

var text5 = new TextField();
text5.x = 250;
text5.y = 165;
text5.filltext = '2D';
text5.font = "95px Showcard Gothic";
text5.color = '#b1b1b1';
text5.rotation = Math.PI/24*(-1);

var text6 = new TextField();
text6.x = 253;
text6.y = 168;
text6.filltext = '2D';
text6.font = "95px Showcard Gothic";
text6.color = '#ffffff';
text6.rotation = Math.PI/24*(-1);


var bitmap = new Bitmap();
bitmap.source = 'wander-icon.jpg';

//渲染队列
var renderQueue = [rect, text2, text4, text6, rect2, rect3, text1, text3, text5];
//资源加载列表
var imageList = ['wander-icon.jpg'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


