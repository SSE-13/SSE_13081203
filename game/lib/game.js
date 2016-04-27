var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    game.GRID_PIXEL_WIDTH = 50;
    game.GRID_PIXEL_HEIGHT = 50;
    var NUM_ROWS = 12;
    var NUM_COLS = 12;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap(mapData) {
            _super.call(this);
            this.isDirty = true;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
            var rows = mapData.length;
            var cols = mapData[0].length;
            var grid = new astar.Grid(rows, cols);
            this.grid = grid;
            for (var col = 0; col < rows; col++) {
                for (var row = 0; row < cols; row++) {
                    if (mapData[col][row] == 0) {
                        grid.setWalkable(row, col, true);
                    }
                    if (mapData[col][row] == 1) {
                        grid.setWalkable(row, col, false);
                    }
                }
            }
        }
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    game.WorldMap = WorldMap;
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile() {
            _super.call(this);
        }
        Tile.prototype.setWalkable = function (value) {
            this.color = value ? "#0000FF" : "#FF0000";
        };
        return Tile;
    }(render.Rect));
    game.Tile = Tile;
    var BoyShape = (function (_super) {
        __extends(BoyShape, _super);
        function BoyShape() {
            _super.call(this);
            var character = new render.Bitmap();
            character.source = "character.png";
            character.scaleX = 0.5;
            character.scaleY = 0.5;
            this.addChild(character);
        }
        return BoyShape;
    }(render.DisplayObjectContainer));
    game.BoyShape = BoyShape;
    var BoyBody = (function (_super) {
        __extends(BoyBody, _super);
        function BoyBody() {
            _super.apply(this, arguments);
            this.x_Array = []; // x坐标
            this.y_Array = []; // y坐标
            this.n = 1; // 为了让计算速度的地方在速度改变前只执行一次 
            this.vx0 = 5; // x方向速度
            this.vy0 = 5; // y方向速度
        }
        BoyBody.prototype.run = function (grid) {
            grid.setStartNode(pos[0][0], pos[0][1]);
            console.log(pos[0][0], pos[0][1]);
            grid.setEndNode(pos[1][0], pos[1][1]);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            this.path = findpath._path;
            for (var i = 0; i < this.path.length; i++) {
                this.x_Array[i] = this.path[i].x;
                this.y_Array[i] = this.path[i].y;
            }
            console.log(this.path);
            console.log(grid.toString());
        };
        BoyBody.prototype.onTicker = function (duringTime) {
            for (var i = 1; i < this.x_Array.length; i++) {
                this.x_move = this.x / 50;
                this.y_move = this.y / 50;
                console.log(this.x_move, this.x_Array[i - 1], this.y_move, this.y_Array[i - 1]);
                if (this.x_move < this.x_Array[i - 1] + 0.02 && this.x_move >= this.x_Array[i - 1] && this.y_move < this.y_Array[i - 1] + 0.02 && this.y_move >= this.y_Array[i - 1] && this.n == i) {
                    this.n++;
                    this.dx = this.x_Array[i] - this.x_Array[i - 1];
                    this.dy = this.y_Array[i] - this.y_Array[i - 1];
                    if (this.dx == 0) {
                        this.vx = 0;
                    }
                    if (this.dx == 1) {
                        this.vx = this.vx0;
                    }
                    if (this.dx == -1) {
                        this.vx = -this.vx0;
                    }
                    if (this.dy == 0) {
                        this.vy = 0;
                    }
                    if (this.dy == 1) {
                        this.vy = this.vy0;
                    }
                    if (this.dy == -1) {
                        this.vy = -this.vy0;
                    }
                }
                if (this.x_move < pos[1][0] + 0.02 && this.x_move >= pos[1][0] && this.y_move >= pos[1][1] && this.y_move < pos[1][1] + 0.02) {
                    this.vx = 0;
                    this.vy = 0;
                    this.path = null;
                    this.n = 1;
                }
            }
            this.y += duringTime * this.vy;
            this.x += duringTime * this.vx;
        };
        return BoyBody;
    }(Body));
    game.BoyBody = BoyBody;
})(game || (game = {}));
