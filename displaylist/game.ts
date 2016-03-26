module game {


}

var human = new render.DisplayObjectContainer();
var head = new render.Bitmap();
var trunk = new render.Bitmap();
var left_arm = new render.Bitmap();
var right_arm = new render.Bitmap();
var left_leg = new render.Bitmap();
var right_leg = new render.Bitmap();
head.source = "head.jpg";
trunk.source = "trunk.jpg";
left_arm.source = "left_arm.jpg";
right_arm.source = "right_arm.jpg";
left_leg.source = "left_leg.jpg";
right_leg.source = "right_leg.jpg";

human.addChild(left_arm);
human.addChild(right_arm);
human.addChild(left_leg);
human.addChild(right_leg);
human.addChild(head);
human.addChild(trunk);

var renderCore = new render.RenderCore();

renderCore.start(human, ["left_arm.jpg"]);
renderCore.start(human, ["right_arm.jpg"]);
renderCore.start(human, ["left_leg.jpg"]);
renderCore.start(human, ["right_leg.jpg"]);
renderCore.start(human, ["head.jpg"]);
renderCore.start(human, ["trunk.jpg"]);


class HumanBody extends Body {


    onTicker(duringTime: number) {

         this.x += this.vx*duringTime;
         this.rotation += Math.PI;

    }
}

var ticker = new Ticker();
var body = new HumanBody(human);
body.vx = 3;
body.y = 200; 
ticker.start([body]);











