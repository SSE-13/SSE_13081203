

var stage = new render.DisplayObjectContainer();

function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    


    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            map_tile.push(tile);

            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }

    return world;

}



function onTileClick(tile: editor.Tile) {
    Undo_map.push(JSON.parse(JSON.stringify(mapData)));
    storage.writeUndoFile(Undo_map);

    UI(tile).x=220;
    UI(tile).y=100;
    stage.addChild(Attribute);       
    mapData[tile.ownedRow][tile.ownedCol] = tile.num;
}

//UI
function UI(tile: editor.Tile) {
   
    var Attribute = new render.DisplayObjectContainer();
    var Background = new render.Rect();
    Background.width = 200;
    Background.height = 150;
    Background.color = '#cecdcd';
    Attribute.addChild(Background);
    
    var X=tile.ownedRow+1;
    var Y=tile.ownedCol+1;
    var postion = new render.TextField();
    postion.text = X+'行 '+Y+'列';
    postion.x=10;
    postion.y=10;
    Attribute.addChild(postion);
    
    var button = new ui.Button();
            button.width = 55;
            button.height = 30;
            button.x=10;
            button.y=70;
            
            if(mapData[tile.ownedRow][tile.ownedCol]==1){
                button.text="不可走";
                button
                button.onClick = ()=> {
                tile.setWalkable(0);
                }
            }else{
                button.text="可走";
                button.onClick = ()=> {
                tile.setWalkable(1);
                }
            }
            Attribute.addChild(button);
            //renderCore.start(Attribute);
           return Attribute; 
         }

function Save() {
    
    var savebutton = new render.DisplayObjectContainer();
    savebutton.width = 55;
    savebutton.height = 30;
    var Background = new render.Rect();
    Background.width = 55;
    Background.height = 30;
    Background.color = '#00FFFF';
    
    var title = new render.TextField();
    title.text = 'Save';
    savebutton.addChild(Background);
    savebutton.addChild(title);
    
    eventCore.register(savebutton, events.displayObjectRectHitTest, onSaveButtonClick);
       
    return savebutton;
    
}

function onSaveButtonClick(){

    console.log("save");
    console.log(mapData);

    storage.saveFile(mapData);
   
}

function Undo() {
    
    var undobutton = new render.DisplayObjectContainer();
    undobutton.width = 55;
    undobutton.height = 30;
    var Background = new render.Rect();
    Background.width = 55;
    Background.height = 30;
    Background.color = '#F0FF0F';
    
    var title = new render.TextField();
    title.text = 'Undo';
    
    undobutton.addChild(Background);
    undobutton.addChild(title);
    
    eventCore.register(undobutton, events.displayObjectRectHitTest, onUndoButtonClick);
       
    return undobutton;
    
}

function onUndoButtonClick(){
    console.log(Undo_map.length); 
    if(Undo_map.length <= 0){
        alert("No Undo");
        
    }
    else{
        console.log("Undo");
        mapData = Undo_map.pop();
        console.log(mapData);
        
        for(var i=0; i < map_tile.length; i++){
            map_tile[i].setWalkable(mapData[map_tile[i].ownedRow][map_tile[i].ownedCol]);
        }
        
    }
       
}


var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;

var Undo_map = new Array();
var map_tile = new Array();

var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();

var save = Save();
save.x = -75;
var undo = Undo();
undo.x = -75;
undo.y = 50;
var mapEditor = createMapEditor();
//var stage = new render.DisplayObjectContainer();
stage.addChild(mapEditor);

var panel = new editor.ControlPanel();
panel.x = 300;
panel.addChild(save);
panel.addChild(undo);
stage.addChild(panel);

renderCore.start(stage);
