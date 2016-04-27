module game {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;

    export class WorldMap extends render.DisplayObjectContainer {

        private cache: HTMLCanvasElement;

        public isDirty = true;   
        public grid: astar.Grid;
        
        constructor(mapData) {
            super();
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
            var rows = mapData.length;
            var cols = mapData[0].length;
            var grid = new astar.Grid(rows,cols);
            this.grid = grid;
            for (var col = 0; col < rows; col++) {
                for (var row = 0; row < cols; row++) {
                    if(mapData[col][row] == 0){
                        grid.setWalkable(row,col,true);
                    }
                     if(mapData[col][row] == 1){
                        grid.setWalkable(row,col,false);
                    }
                    
                    
                }
            }            
        }

        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }
    
    export class Tile extends render.Rect {


        public ownedRow: number;
        public ownedCol: number;


        constructor() {
            super();
        }

        public setWalkable(value) {
            this.color = value ? "#0000FF" : "#FF0000";
        }
    }

    export class BoyShape extends render.DisplayObjectContainer {
        constructor(){
            super();   
            var character = new render.Bitmap();
            character.source = "character.png";
            character.scaleX = 0.5;
            character.scaleY = 0.5;
            this.addChild(character);
        }
    }

    export class BoyBody extends Body {

        public x_Array = [];    // x坐标
        public y_Array = [];    // y坐标
        public dx : number;     // x方向的变化量
        public dy : number;     // y方向的变化量
        public x_move : number;   // 物体x方向移动位置换算成x坐标
        public y_move : number;   // 物体y方向移动位置换算成y坐标
        public n=1;               // 为了让计算速度的地方在速度改变前只执行一次 
        public vx0 =5;            // x方向速度
        public vy0 =5;            // y方向速度
        public path :astar.Node[];
        public run(grid) {
            
            grid.setStartNode(pos[0][0], pos[0][1]);
            console.log(pos[0][0],pos[0][1]);
            grid.setEndNode(pos[1][0], pos[1][1]);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            this.path = findpath._path;
           
            for (var i=0;　i < this.path.length　; i++){
                this.x_Array[i]=this.path[i].x;
                this.y_Array[i]=this.path[i].y;
              
            }
       
            console.log(this.path);
            console.log(grid.toString());
        }

        public onTicker(duringTime) {
            for(var i=1 ; i < this.x_Array.length ; i++){
                
                this.x_move = this.x/50;
                this.y_move = this.y/50;
                console.log(this.x_move,this.x_Array[i-1],this.y_move,this.y_Array[i-1]);
                if(this.x_move < this.x_Array[i-1]+0.02 && this.x_move >= this.x_Array[i-1] && this.y_move < this.y_Array[i-1] + 0.02 && this.y_move >= this.y_Array[i-1] &&this.n==i){
                    this.n++; 
                    
                    this.dx = this.x_Array[i]-this.x_Array[i-1];
                    this.dy = this.y_Array[i]-this.y_Array[i-1];
     
                    if(this.dx == 0){
                        this.vx = 0;                      
                    }
                    if(this.dx == 1){
                        this.vx = this.vx0;                       
                    }
                    if(this.dx == -1){
                        this.vx = -this.vx0;
               
                    }
                    if(this.dy == 0){
                        this.vy = 0;
                        
                    }
                    if(this.dy == 1){
                        this.vy = this.vy0;
                        
                        
                    }
                    if(this.dy == -1){
                        this.vy = -this.vy0;
              
                    }
                }
               
          
            if(this.x_move < pos[1][0] + 0.02 && this.x_move>= pos[1][0] &&this.y_move >= pos[1][1] && this.y_move < pos[1][1] + 0.02){
                this.vx = 0;               
                this.vy = 0;
                this.path = null;
                this.n = 1;
            }
        }
                this.y += duringTime * this.vy;
                this.x += duringTime * this.vx;  
        }     
    }
    
}




