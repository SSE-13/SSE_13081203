
var human = new render.DisplayObjectContainer();
human.x = -50;
human.y = -100;
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.x = 10;
head.y = -60;
var trunk = new render.Bitmap();
trunk.x = 20;
var left_arm = new render.Bitmap();
left_arm.x = -50;
var right_arm = new render.Bitmap();
right_arm.x = 60;
var left_leg = new render.Bitmap();
left_leg.x = -30;
left_leg.y = 80;
var right_leg = new render.Bitmap();
right_leg.x = 40;
right_leg.y = 80;

head.source = "head.jpg";
trunk.source = "trunk.jpg";
left_arm.source = "left_arm.jpg";
right_arm.source = "right_arm.jpg";
left_leg.source = "left_leg.jpg";
right_leg.source = "right_leg.jpg";

humanContainer.addChild(human);
human.addChild(left_arm);
human.addChild(right_arm);
human.addChild(left_leg);
human.addChild(right_leg);
human.addChild(head);
human.addChild(trunk);


var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["left_arm.jpg","right_arm.jpg", "left_leg.jpg", "right_leg.jpg", "head.jpg", "trunk.jpg"]);

class HumanBody extends Body {
    
    
    vx:number = 5;
    vrotation = Math.PI/2;

    onTicker(duringTime: number) {
        this.x += this.vx*duringTime;
        this.rotation += this.vrotation*duringTime;
        

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.y = 200; 
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var isHead = 0;
var isLeg = 0;

var HitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    alert (`点击位置为${localPoint.x},${localPoint.y}`);
    
    return true;
  
}

var OnClick = () => {

    if(isHead == 1){
          body.vx *= -1;
          body.vrotation *= -1;
    }
    
        if(isLeg == 1){
        body.vx = 0;
        body.vrotation = 0;
        body.rotation = 0;
    }

    if(isLeg >= 1 && isHead >= 2){
        body.vx = 5;
        body.vrotation = Math.PI/2;
        isHead = 0;
        isLeg = 0;
    }
  console.log("clickhead:"+isHead);
  console.log("clickleg:"+ isLeg);
    

}


eventCore.register(head,HitTest,OnClick);











