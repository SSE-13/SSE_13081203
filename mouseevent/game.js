var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
renderCore.start(humanContainer, ["left_arm.jpg", "right_arm.jpg", "left_leg.jpg", "right_leg.jpg", "head.jpg", "trunk.jpg"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx = 5;
        this.vrotation = Math.PI / 2;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += this.vx * duringTime;
        this.rotation += this.vrotation * duringTime;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.y = 200;
body.x = 200;
ticker.start([body]);
var eventCore = new events.EventCore();
eventCore.init();
var isHead = 0;
var ClickedHead = false;
var isLeg = 0;
var ClickedLeg = false;
var HeadHitTest = function (localPoint, displayObject) {
    // alert (`点击位置为${localPoint.x},${localPoint.y}`);
    console.log(localPoint);
    if (localPoint.x <= Math.abs(displayObject.x * 6) && localPoint.y <= Math.abs(displayObject.y) &&
        localPoint.x > 0 && localPoint.y > 0) {
        isHead += 1;
        ClickedHead = true;
    }
    return ClickedHead;
};
var LegHitTest = function (localPoint, displayObject) {
    // alert (`点击位置为${localPoint.x},${localPoint.y}`);
    console.log(localPoint);
    if (localPoint.x > 0 && localPoint.x <= Math.abs(displayObject.x * 2) && localPoint.y > 0 && localPoint.y < Math.abs(displayObject.y * 2)) {
        isLeg += 1;
        ClickedLeg = true;
    }
    return ClickedLeg;
};
var HeadOnClick = function () {
    if (isHead == 1) {
        if (body.vx != 0) {
            body.vx *= -1;
            body.vrotation *= -1;
        }
        if (body.vx == 0) {
            isHead = 0;
        }
    }
    if (isHead != 1) {
        body.vx = 5;
        body.vrotation = Math.PI / 2;
        isHead = 0;
    }
    ClickedHead = false;
    console.log("clickhead:" + isHead);
};
var LegOnClick = function () {
    if (isLeg == 1) {
        body.vx = 0;
        body.vrotation = 0;
        body.rotation = 0;
    }
    if (isLeg >= 1) {
        isLeg = 0;
    }
    ClickedLeg = false;
    console.log("clickleg:" + isLeg);
};
eventCore.register(head, HeadHitTest, HeadOnClick);
eventCore.register(left_leg, LegHitTest, LegOnClick);
eventCore.register(right_leg, LegHitTest, LegOnClick);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ2hELEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDZCxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0FBQ2YsSUFBSSxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztBQUN6RCxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMvQixJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNaLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDYixJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNoQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNiLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ25DLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDcEMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDakIsSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDbkMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUNqQixRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNoQixJQUFJLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNwQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNqQixTQUFTLENB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