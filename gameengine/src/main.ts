

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

    var pos = new command.CommandA(tile.ownedRow,tile.ownedCol);
    invoker.setCommand(pos);
    stage.addChild(UI(tile)); 
    
     if(tile.num==1){
        button.text="不可走";
        button.color = '#0000FF';
    }else{
        button.text="可走";
        button.color = '#FF0000';
    }
    button.onClick = ()=> {

        if(tile.num==1){
            tile.setWalkable(0);
            console.log(tile);
            button.text="可走";
            button.color = '#FF0000';
           
        }else{
            tile.setWalkable(1);
            console.log(tile);
            button.text="不可走";
            button.color = '#0000FF';
           
        }
        mapData[tile.ownedRow][tile.ownedCol] = tile.num;
    }      

}

//UI
function UI(tile: editor.Tile) {
   
    var Attribute = new render.DisplayObjectContainer();
    Attribute.x=220;
    Attribute.y=50;
    var Background = new render.Rect();
    Background.width = 200;
    Background.height = 50;
    Background.color = '#cecdcd';
    Attribute.addChild(Background);
    
    var X=tile.ownedRow+1;
    var Y=tile.ownedCol+1;
    var postion = new render.TextField();
    postion.text = X+'行 '+Y+'列';
    postion.x=10;
    postion.y=10;
    Attribute.addChild(postion);
    
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

    if(invoker.canUndo()){

        invoker.undo();
       
        var row =  invoker.new_command.new_row;
        var col = invoker.new_command.new_col;

        
        for(var i=0; i < map_tile.length; i++){
            if(map_tile[i].ownedRow==row && map_tile[i].ownedCol==col){
                 map_tile[i].setWalkable(Math.abs(mapData[map_tile[i].ownedRow][map_tile[i].ownedCol]-1));
            }
           
        }
    }
        
    
       
}


function materia(){
    var materia = new render.DisplayObjectContainer();
    var M_button=new Array();
    for(var i=1;i<9;i++){
        M_button[i] = new ui.Button();
        M_button[i].text='素材'+i;
        M_button[i].width = 100;
        M_button[i].height = 30;
        M_button[i].color='#cecdcd';
        M_button[i].y=Math.floor((i-1)/2)*30;
        M_button[i].x=Math.abs((i%2-1)*100);
        materia.addChild(M_button[i]);
    }
    return materia;
}


var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;


var map_tile = new Array();

var invoker = new command.Invoker();
invoker.init();

var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();

var save = Save();
save.x = 220;
var undo = Undo();
undo.x = 350;

var Materia = materia();
Materia.x = 220;
Materia.y=130;

var mapEditor = createMapEditor();

stage.addChild(mapEditor);

var button = new ui.Button();
button.width = 200;
button.height = 30;
button.color = "#cecdcd"
button.x=220;
button.y=100;

var panel = new editor.ControlPanel();
panel.x = 300;

stage.addChild(save);
stage.addChild(undo);
stage.addChild(button);
stage.addChild(Materia)


renderCore.start(stage,["Wall3.jpg","Wall4.jpg"]);

