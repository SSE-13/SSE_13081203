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
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
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
var M_button = new Array();
function materia() {
    var materia = new render.DisplayObjectContainer();
    for (var i = 0; i < 8; i++) {
        M_button[i] = new ui.Button();
        if (i % 2 == 0) {
            M_button[i].text = '星空' + ((i + 2) / 2);
        }
        else {
            M_button[i].text = '障碍' + ((i + 1) / 2);
        }
        M_button[i].width = 100;
        M_button[i].height = 30;
        M_button[i].color = '#cecdcd';
        M_button[i].y = Math.floor(i / 2) * 30;
        M_button[i].x = Math.abs((i % 2) * 100);
        materia.addChild(M_button[i]);
    }
    return materia;
}
function onTileClick(tile) {
    stage.addChild(UI(tile));
    if (tile.num % 2 == 1) {
        button.text = "不可走";
        click(false, tile);
        button.color = '#0000FF';
    }
    else if (tile.num % 2 == 0) {
        button.text = "可走";
        click(true, tile);
        button.color = '#FF0000';
    }
    button.onClick = function () {
        //点击可走不可走选择素材，可走素材1357可点，不可走2468可点，此时并不能更改地图图片
        if (tile.num % 2 == 1) {
            var pos = new command.CommandA(tile.ownedRow, tile.ownedCol, tile.num);
            invoker.setCommand(pos);
            button.text = "可走";
            click(true, tile);
            button.color = '#FF0000';
        }
        else if (tile.num % 2 == 0) {
            var pos = new command.CommandA(tile.ownedRow, tile.ownedCol, tile.num);
            invoker.setCommand(pos);
            button.text = "不可走";
            click(false, tile);
            button.color = '#0000FF';
        }
    };
}
function click(b, tile) {
    if (b == true) {
        for (var i = 0; i < 8; i++) {
            if (i % 2 == 0) {
                M_button[i].name = i.toString();
                M_button[i].onClick = function (M_button) {
                    var buttonIndex = parseInt(M_button.name);
                    var pos = new command.CommandA(tile.ownedRow, tile.ownedCol, tile.num);
                    invoker.setCommand(pos);
                    if (tile != map_tile[63]) {
                        tile.setWalkable(buttonIndex);
                        mapData[tile.ownedRow][tile.ownedCol] = tile.num;
                    }
                    if (tile == map_tile[63]) {
                        alert("Can't change");
                    }
                };
            }
            else {
                M_button[i].onClick = function (M_button) {
                };
            }
        }
    }
    if (b == false) {
        for (var i = 0; i < 8; i++) {
            if (i % 2 == 1) {
                M_button[i].name = i.toString();
                M_button[i].onClick = function (M_button) {
                    var buttonIndex = parseInt(M_button.name);
                    var pos = new command.CommandA(tile.ownedRow, tile.ownedCol, tile.num);
                    invoker.setCommand(pos);
                    tile.setWalkable(buttonIndex);
                    mapData[tile.ownedRow][tile.ownedCol] = tile.num;
                };
            }
            else {
                M_button[i].onClick = function (M_button) {
                };
            }
        }
    }
}
//UI
function UI(tile) {
    var Attribute = new render.DisplayObjectContainer();
    Attribute.x = 420;
    Attribute.y = 50;
    var Background = new render.Rect();
    Background.width = 200;
    Background.height = 50;
    Background.color = '#cecdcd';
    Attribute.addChild(Background);
    var X = tile.ownedRow + 1;
    var Y = tile.ownedCol + 1;
    var postion = new render.TextField();
    postion.text = X + '行 ' + Y + '列';
    postion.x = 10;
    postion.y = 10;
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
function onSaveButtonClick() {
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
function onUndoButtonClick() {
    if (invoker.canUndo()) {
        invoker.undo();
        var row = invoker.new_command.new_row;
        var col = invoker.new_command.new_col;
        var num = invoker.new_command.new_num;
        for (var i = 0; i < map_tile.length; i++) {
            if (map_tile[i].ownedRow == row && map_tile[i].ownedCol == col) {
                map_tile[i].setWalkable(num);
                console.log(i);
                mapData[map_tile[i].ownedRow][map_tile[i].ownedCol] = map_tile[i].num;
            }
        }
    }
    else {
        alert("No Undo!");
    }
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
save.x = 420;
var undo = Undo();
undo.x = 550;
var Materia = materia();
Materia.x = 420;
Materia.y = 130;
var mapEditor = createMapEditor();
stage.addChild(mapEditor);
var button = new ui.Button();
button.width = 200;
button.height = 30;
button.color = "#cecdcd";
button.x = 420;
button.y = 100;
var panel = new editor.ControlPanel();
panel.x = 500;
stage.addChild(save);
stage.addChild(undo);
stage.addChild(button);
stage.addChild(Materia);
renderCore.start(stage, ["space2.jpg", "space1.jpg", "space3.jpg", "Road.jpg", "barrier1.jpg", "barrier2.jpg", "barrier3.jpg", "barrier4.jpg"]);
renderCore.start(stage);
