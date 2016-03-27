var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var human = new render.DisplayObjectContainer();
<<<<<<< HEAD
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
=======
var head = new render.Bitmap();
var trunk = new render.Bitmap();
var left_arm = new render.Bitmap();
var right_arm = new render.Bitmap();
var left_leg = new render.Bitmap();
var right_leg = new render.Bitmap();
>>>>>>> 9895fbe89246f80f482d294c317115232dce6adc
head.source = "head.jpg";
trunk.source = "trunk.jpg";
left_arm.source = "left_arm.jpg";
right_arm.source = "right_arm.jpg";
left_leg.source = "left_leg.jpg";
right_leg.source = "right_leg.jpg";
<<<<<<< HEAD
humanContainer.addChild(human);
=======
>>>>>>> 9895fbe89246f80f482d294c317115232dce6adc
human.addChild(left_arm);
human.addChild(right_arm);
human.addChild(left_leg);
human.addChild(right_leg);
human.addChild(head);
human.addChild(trunk);
var renderCore = new render.RenderCore();
<<<<<<< HEAD
renderCore.start(human, ["left_arm.jpg", "right_arm.jpg", "left_leg.jpg", "right_leg.jpg", "head.jpg", "trunk.jpg"]);
=======
renderCore.start(human, ["left_arm.jpg"]);
renderCore.start(human, ["right_arm.jpg"]);
renderCore.start(human, ["left_leg.jpg"]);
renderCore.start(human, ["right_leg.jpg"]);
renderCore.start(human, ["head.jpg"]);
renderCore.start(human, ["trunk.jpg"]);
>>>>>>> 9895fbe89246f80f482d294c317115232dce6adc
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += this.vx * duringTime;
        this.rotation += Math.PI;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(human);
body.vx = 3;
body.y = 200;
ticker.start([body]);
//# sourceMappingURL=game.js.map