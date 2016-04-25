
module editor {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;

        public isDirty = true;
        constructor() {

            super();
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;

        }


        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }


    export class Tile extends render.Bitmap {


        public ownedRow: number;
        public ownedCol: number;


        constructor() {
            super();
        }

        public setWalkable(value) {
            // this.color = value ? "#0000FF" : "#FF0000";
            // this.source = value ? "water.jpg":"Wall4.jpg";
            this.num = value;
            switch (value) {
                case 0:
                     this.source = "water.jpg";
                    break;
                case 1:
                     this.source = "Wall4.jpg";
                    break;
                case 2:
                     this.source = "grass.jpg";
                    break;
                case 3:
                     this.source = "Wall3.jpg";
                    break;
                case 4:
                     this.source = "Road2.jpg";
                    break;
                case 5:
                     this.source = "Road.jpg";
                    break;
                case 6:
                     this.source = "Wall1.jpg";
                    break;
                case 7:
                     this.source = "Wall2.jpg";
                    break;
            
                default:
                    break;
            }           
        }
        /*public setWalkable2(value) {
            this.source = value ? "grass.jpg":"Wall3.jpg";
            this.num = value;           
        }
        public setWalkable3(value) {
            this.source = value ? "Road2.jpg":"Road.jpg";
            this.num = value;           
        }
        public setWalkable4(value) {
            this.source = value ? "Wall1.jpg":"Wall2.jpg";
            this.num = value;           
        }*/
    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {
        
        constructor(){
            super();

        }
        
    }
}
